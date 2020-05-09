/* globals expect */
import { matcherHint, printReceived } from 'jest-matcher-utils';
import * as R from 'ramda';
import { v4, v5 } from 'uuid';
import configJson from './src/config.json';

global.mockKataDto = () => ({
  id: v4(),
  name: 'test-name',
  details: 'test-details',
  code: 'const code = true',
  test: '// tests',
  tags: ['new', 'perf'],
});

global.mockKataEntity = () => {
  const dto = global.mockKataDto();
  return {
    ...dto,
    tags: dto.tags.map((t) => ({
      id: v5(t, configJson.uuidNamespaces.tag),
      tag: t,
    })),
  };
};

const buildMessage = (matcherName, message) => (
  received
) => () => `${matcherHint(matcherName, 'received', '')}

${message}. Received:
  ${printReceived(received)}`;

/* const buildMessageWithExpected = (matcherName, message) => (
  received,
  expected
) => () => `${matcherHint(matcherName, 'received', '')}

${message}:
  ${printExpected(expected)}
Received:
  ${printReceived(received)}`; */

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
      }),
      R.compose(R.equals(6), R.length, R.keys)
    ),
    'kata entity'
  ),
  toBeKataRepo: makeToBeMatcher(
    'toBeKataRepo',
    R.both(
      R.where({
        allKatas: R.is(Function),
        katasOfTag: R.is(Function),
        save: R.is(Function),
      }),
      R.compose(R.equals(3), R.length, R.keys)
    ),
    'kata repository'
  ),
  toBeUuid: makeToBeMatcher('toBeUuid', isUuid, 'UUID'),
});
