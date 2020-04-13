import { v4 as uuidv4 } from 'uuid';

export default function kata(kataId, props) {
  const id = kataId || uuidv4();
  const defaults = {
    details: '',
    name: 'Mistery kata',
    code: '',
    tests: '',
    tags: [],
  };
  return {
    ...defaults,
    ...props,
    id,
    isTaggedAs(tag) {
      return this.tags.includes(tag);
    },
  };
}
