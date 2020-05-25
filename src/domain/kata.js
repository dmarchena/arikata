import { v4, v5 } from 'uuid';
import * as R from 'ramda';

import { isUuid } from '../utils/uuid';
import Training from './training';

import config from '../config.json';

const tagEntity = (str) =>
  R.is(String) && {
    id: v5(str, config.uuidNamespaces.tag),
    tag: str,
  };

const isTagEntity = R.where({
  id: isUuid,
  tag: R.is(String),
});

const factory = (repository) => (
  id = v4(),
  { details = '', name = 'Mistery kata', code = '', test = '', tags = [] } = {}
) => ({
  id,
  name,
  details,
  code,
  test,
  tags: tags.map(R.ifElse(isTagEntity, R.identity, tagEntity)),
  availableTags() {
    return repository
      ? repository.getAllTags()
      : Promise.reject(new ReferenceError('Action not available'));
  },
  startTraining(userId) {
    return Training.create(undefined, {
      kataId: this.id,
      code, // initial code of the kata
      userId,
    });
  },
});

export default function Kata({ repo } = {}) {
  return {
    create: factory(repo),
  };
}
