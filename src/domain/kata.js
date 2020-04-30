import { v4 as uuidv4 } from 'uuid';

export default function kata(
  id = uuidv4(),
  { details = '', name = 'Mistery kata', code = '', test = '', tags = [] } = {}
) {
  return {
    id,
    name,
    details,
    code,
    test,
    tags,
  };
}
