import { v4 as uuidv4 } from 'uuid';

export default function user(
  id = uuidv4(),
  { email = '', password = '' } = {}
) {
  return {
    id,
    email,
    password,
  };
}
