import { v5 } from 'uuid';
import config from '../config.json';

const factory = () => (
  id,
  { email, password = '', roles = [], accessToken = '' } = {}
) => ({
  id: id ?? v5(email ?? '', config.uuidNamespaces.user),
  email: email ?? '',
  password,
  roles,
  accessToken,
  setEmail(value) {
    this.email = value;
    this.id = v5(value ?? '', config.uuidNamespaces.user);
  },
});

export default function User({ repo } = {}) {
  return {
    create: factory(repo),
  };
}
