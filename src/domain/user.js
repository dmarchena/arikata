import { v4 as uuidv4 } from 'uuid';

export default function user(userId, { email, password, role }) {
  const id = userId || uuidv4();
  return {
    id,
    email,
    password,
    role,
  };
}
