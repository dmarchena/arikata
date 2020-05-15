import { v4, v5 } from 'uuid';
import * as R from 'ramda';

import { isUuid } from '../utils/uuid';
import config from '../config';

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
  availableTags: () =>
    repository
      ? repository.getAllTags()
      : Promise.reject(new ReferenceError('Action not available')),
});

export default function Kata({ repo } = {}) {
  return {
    create: factory(repo),
  };
}
