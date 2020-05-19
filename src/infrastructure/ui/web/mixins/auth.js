import { getters } from '../store';
import config from '../../../../config.json';

export default {
  computed: {
    user() {
      return this.$store?.getters[getters.auth.getUser];
    },
    isAdmin() {
      return this.user?.roles?.includes(config.userRoles.admin) ?? false;
    },
    isSignedIn() {
      return !!(this.user ?? false);
    },
  },
};
