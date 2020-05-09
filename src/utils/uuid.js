import { is } from 'ramda';

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isUuid = (str) => is(String)(str) && uuidRegex.test(str);

export { isUuid, uuidRegex };
