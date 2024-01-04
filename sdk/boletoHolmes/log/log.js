const rest = require('../../utils/rest.js');
const check = require('core-node').check;
const Resource = require('../../utils/resource.js').Resource


class Log extends Resource {
    /**
     *
     * Boletoholmes.Log object
     *
     * @description Every time a BoletoHolmes entity is modified, a corresponding boletoholmes.Log
     * is generated for the entity. This log is never generated by the
     * user, but it can be retrieved to check additional information
     * on the BoletoHolmes.
     *
     * Attributes:
     * @param id [string]: unique id returned when the log is created. ex: '5656565656565656'
     * @param holmes [BoletoHolmes]: BoletoHolmes entity to which the log refers to.
     * @param type [string]: type of the BoletoHolmes event which triggered the log creation. ex: "solving" or "solved"
     * @param created [string]: creation datetime for the log. ex: '2020-03-10 10:30:00.000'
     * @param updated [string]: latest update datetime for the log. ex: '2020-03-10 10:30:00.000'
     *
     */
    constructor({ id, holmes, type, created, updated }) {
        super(id);
        this.holmes = holmes;
        this.type = type;
        this.created = check.datetime(created);
        this.updated = check.datetime(updated);
    }
}

exports.Log = Log;
let resource = {'class': exports.Log, 'name': 'BoletoHolmesLog'};


exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific boletoHolmes.Log
     *
     * @description Receive a single boletoHolmes.Log object previously created by the Stark Bank API by passing its id
     *
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns boletoholmes.Log object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
};

exports.query = async function ({ limit, after, before, types, holmesIds, user} = {}) {
    /**
     *
     * Retrieve Boleto Logs
     *
     * @description Receive a generator of Boleto Log objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param types [list of strings, default null]: filter for log event types. ex: 'paid' or 'registered'
     * @param holmesIds [list of strings, default null]: list of BoletoHolmes ids to filter retrieved objects.ex: ["5656565656565656", "4545454545454545"]
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of Boleto Log objects with updated attributes
     *
     */
    let query = {
        limit: limit,
        after: after,
        before: before,
        types: types,
        holmesIds: holmesIds,
    };
    return rest.getList(resource, query, user);
};

exports.page = async function ({ cursor, limit, after, before, types, holmesIds, user} = {}) {
    /**
     *
     * Retrieve paged Boleto Logs
     *
     * @description Receive a list of BoletoHolmes.Log objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * @param cursor [string, default null]: cursor returned on the previous page function call
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param types [list of strings, default null]: filter for log event types. ex: 'paid' or 'registered'
     * @param holmesIds [list of strings, default null]: list of BoletoHolmes ids to filter retrieved objects.ex: ["5656565656565656", "4545454545454545"]
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of Boleto Log objects with updated attributes and cursor to retrieve the next page of BoletoHolmes.Log objects
     *
     */
    let query = {
        cursor: cursor,
        limit: limit,
        after: after,
        before: before,
        types: types,
        holmesIds: holmesIds,
    };
    return rest.getPage(resource, query, user);
};
