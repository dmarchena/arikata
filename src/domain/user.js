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
});

export default function User({ repo } = {}) {
  return {
    create: factory(repo),
  };
}
