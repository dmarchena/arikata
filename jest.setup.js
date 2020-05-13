/* globals expect */
import { createLocalVue } from '@vue/test-utils';
import { matcherHint, printReceived, printExpected } from 'jest-matcher-utils';
import * as R from 'ramda';
import VueRouter from 'vue-router';
import deepEqual from 'deep-equal';
import mockJson from './src/mock.json';

const fooDirective = {};
global.createCustomLocalVue = () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  localVue.directive('bem-block', fooDirective);
  localVue.directive('bem', fooDirective);
  return localVue;
};

global.mockKataData = () => {
  const data = {
    ...mockJson.kataDto,
  };
  delete data.id;
  return data;
};
global.mockKataDto = () => mockJson.kataDto;
global.mockKataEntity = () => ({
  ...mockJson.kataEntity,
  availableTags() {
    return [];
  },
});

const buildMessage = (matcherName, message) => (
  received
) => () => `${matcherHint(matcherName, 'received', '')}

${message}. Received:
  ${printReceived(received)}`;

const buildMessageWithExpected = (matcherName, message) => (
  received,
  expected
) => () => `${matcherHint(matcherName, 'received', 'expected')}

${message}:
  ${printExpected(expected)}
Received:
  ${printReceived(received)}`;

const makeToBeMatcher = (matcherName, predicate, expectedTypeName) => {
  const passMessage = buildMessage(
    `.not.${matcherName}`,
    `expected value not to be ${expectedTypeName}`
  );
  const failMessage = buildMessage(
    matcherName,
    `expected value to be ${expectedTypeName}`
  );
  return (received) => {
    const pass = predicate(received);
    return {
      message: pass ? passMessage(received) : failMessage(received),
      pass,
    };
  };
};

const makeExpectedMatcher = (matcherName, predicate) => {
  const passMessage = buildMessageWithExpected(
    `.not.${matcherName}`,
    `expected value not to be:`
  );
  const failMessage = buildMessageWithExpected(
    matcherName,
    `expected value to be:`
  );
  return (received, expected) => {
    const pass = predicate(received, expected);
    return {
      message: pass
        ? passMessage(received, expected)
        : failMessage(received, expected),
      pass,
    };
  };
};

const isUuid = R.test(
  /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
);

const isApplicationService = R.both(
  R.is(Object),
  R.compose(R.all(R.is(Function)), R.values)
);

expect.extend({
  toBeAppInstance: makeToBeMatcher(
    'toBeAppInstance',
    R.both(
      R.where({
        browseService: isApplicationService,
        manageKataService: isApplicationService,
      }),
      R.compose(R.equals(2), R.length, R.keys)
    ),
    'Application with injected dependencies'
  ),
  toBeApplicationService: makeToBeMatcher(
    'toBeApplicationService',
    isApplicationService,
    'Application Service'
  ),
  toBeKataDto: makeToBeMatcher(
    'toBeKataDto',
    R.both(
      R.where({
        id: R.either(R.isNil, R.is(String)),
        details: R.is(String),
        name: R.is(String),
        code: R.is(String),
        test: R.is(String),
        tags: R.both(R.is(Array), R.all(R.is(String))),
      }),
      R.compose(R.equals(6), R.length, R.keys)
    ),
    'kata DTO'
  ),
  toBeKataEntity: makeToBeMatcher(
    'toBeKataEntity',
    R.both(
      R.where({
        id: R.is(String),
        details: R.is(String),
        name: R.is(String),
        code: R.is(String),
        test: R.is(String),
        tags: R.both(
          R.is(Array),
          R.all(
            R.where({
              id: R.is(String),
              tag: R.is(String),
            })
          )
        ),
        availableTags: R.is(Function),
      }),
      R.compose(R.equals(7), R.length, R.keys)
    ),
    'kata entity'
  ),
  toEqualKataEntity: makeExpectedMatcher(
    'toEqualKataEntity',
    (received, expected) => {
      // Remove entity methods
      const r = { ...received };
      const e = { ...expected };
      delete r.availableTags;
      delete e.availableTags;
      // Compare resultant data
      return deepEqual(r, e, { strict: true });
    }
  ),
  toBeKataRepo: makeToBeMatcher(
    'toBeKataRepo',
    R.both(
      R.where({
        getAllKatas: R.is(Function),
        getAllKatasWithTag: R.is(Function),
        getAllTags: R.is(Function),
        getKataWithId: R.is(Function),
        remove: R.is(Function),
        save: R.is(Function),
        transformer: R.is(Object),
        update: R.is(Function),
      }),
      R.compose(R.equals(8), R.length, R.keys)
    ),
    'kata repository'
  ),
  toBeUuid: makeToBeMatcher('toBeUuid', isUuid, 'UUID'),
});
