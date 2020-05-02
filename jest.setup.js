/* globals expect */
import { matcherHint, printReceived } from 'jest-matcher-utils';
import * as R from 'ramda';

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
      }),
      R.compose(R.equals(1), R.length, R.keys)
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
        id: R.is(String),
        details: R.is(String),
        name: R.is(String),
        code: R.is(String),
        test: R.is(String),
        tags: R.is(Array),
      }),
      R.compose(R.equals(6), R.length, R.keys)
    ),
    'kata DTO'
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
