import { v4, v5 } from 'uuid';
import * as R from 'ramda';
import config from '../config';
import { isUuid } from '../utils/uuid';

const tagEntity = (str) =>
  R.is(String) && {
    id: v5(str, config.uuidNamespaces.tag),
    tag: str,
  };

const isTagEntity = R.where({
  id: isUuid,
  tag: R.is(String),
});

export default function kata(
  id = v4(),
  { details = '', name = 'Mistery kata', code = '', test = '', tags = [] } = {}
) {
  return {
    id,
    name,
    details,
    code,
    test,
    tags: tags.map(R.ifElse(isTagEntity, R.identity, tagEntity)),
  };
}
