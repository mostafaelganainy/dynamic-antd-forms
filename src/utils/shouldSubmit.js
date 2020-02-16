import _ from 'lodash';

const shouldSubmit = errors => _.isEmpty(_.compact(Object.values(errors)));

export default shouldSubmit;
