const rest = require('../../utils/rest.js');
const check = require('core-node').check;
const Resource = require('../../utils/resource.js').Resource;


class Log extends Resource {
  /**
   *
   * BrcodePayment Log object
   *
   * @description Every time a BrcodePayment entity is updated, a corresponding BrcodePayment Log
   * is generated for the entity. This log is never generated by the
   * user, but it can be retrieved to check additional information
   * on the BrcodePayment.
   *
   * Attributes:
   * @param id [string]: unique id returned when the log is created. ex: '5656565656565656'
   * @param payment [BrcodePayment]: BrcodePayment entity to which the log refers to.
   * @param errors [list of strings]: list of errors linked to this BrcodePayment event
   * @param type [string]: type of the BrcodePayment event which triggered the log creation. ex: 'success'
   * @param created [string]: creation datetime for the log. ex: '2020-03-10 10:30:00.000'
   *
   */
  constructor({ created, type, errors, payment, id }) {
      super(id);
      this.created = check.datetime(created);
      this.type = type;
      this.errors = errors;
      this.payment = payment;
  }
}

exports.Log = Log;
let resource = {'class': exports.Log, 'name': 'BrcodePaymentLog'};


exports.get = async function (id, {user} = {}) {
  /**
   *
   * Retrieve a specific BrcodePayment Log
   *
   * @description Receive a single BrcodePayment Log object previously created by the Stark Bank API by passing its id
   *
   * Parameters (required):
   * @param id [string]: object unique id. ex: '5656565656565656'
   *
   * Parameters (optional):
   * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
   *
   * Return:
   * @returns BrcodePayment Log object with updated attributes
   *
   */
  return rest.getId(resource, id, user);
};

exports.query = async function ({ limit, after, before, types, paymentIds, user} = {}) {
  /**
   *
   * Retrieve BrcodePayment Logs
   *
   * @description Receive a generator of BrcodePayment Log objects previously created in the Stark Bank API
   *
   * Parameters (optional):
   * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
   * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
   * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
   * @param types [list of strings, default null]: filter for log event types. ex: 'success'
   * @param paymentIds [list of strings, default null]: list of BrcodePayment ids to filter logs. ex: ['5656565656565656', '4545454545454545']
   * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
   *
   * Return:
   * @returns list of BrcodePayment Log objects with updated attributes
   *
   */
  let query = {
      limit: limit,
      after: after,
      before: before,
      types: types,
      paymentIds: paymentIds,
  };
  return rest.getList(resource, query, user);
};

exports.page = async function ({ cursor, limit, after, before, types, paymentIds, user } = {}) {
  /**
   *
   * Retrieve paged BrcodePayment Logs
   *
   * @description Receive a list of up to 100 BrcodePayment.Log objects previously created in the Stark Bank API and the cursor to the next page.
   * Use this function instead of query if you want to manually page your requests.
   *
   * Parameters (optional):
   * @param cursor [string, default null]: cursor returned on the previous page function call
   * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
   * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
   * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
   * @param types [list of strings, default null]: filter for log event types. ex: 'success'
   * @param paymentIds [list of strings, default null]: list of BrcodePayment ids to filter logs. ex: ['5656565656565656', '4545454545454545']
   * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
   *
   * Return:
   * @returns list of BrcodePayment Log objects with updated attributes and cursor to retrieve the next page of BrcodePayment.Log objects
   *
   */
  let query = {
    cursor: cursor,
    limit: limit,
    after: after,
    before: before,
    types: types,
    paymentIds: paymentIds,
  };
  return rest.getPage(resource, query, user);
};
