/**
 * Datastores
 * (sails.config.datastores)
 *
 * A set of datastore configurations which tell Sails where to fetch or save
 * data when you execute built-in model methods like `.find()` and `.create()`.
 *
 *  > This file is mainly useful for configuring your development database,
 *  > as well as any additional one-off databases used by individual models.
 *  > Ready to go live?  Head towards `config/env/production.js`.
 *
 * For more information on configuring datastores, check out:
 * https://sailsjs.com/config/datastores
 */

module.exports.datastores = {


  /***************************************************************************
  *                                                                          *
  * Your app's default datastore.                                            *
  *                                                                          *
  * Sails apps read and write to local disk by default, using a built-in     *
  * database adapter called `sails-disk`.  This feature is purely for        *
  * convenience during development; since `sails-disk` is not designed for   *
  * use in a production environment.                                         *
  *                                                                          *
  * To use a different db _in development_, follow the directions below.     *
  * Otherwise, just leave the default datastore as-is, with no `adapter`.    *
  *                                                                          *
  * (For production configuration, see `config/env/production.js`.)          *
  *                                                                          *
  ***************************************************************************/

  default: {

    /***************************************************************************
    *                                                                          *
    * Want to use a different database during development?                     *
    *                                                                          *
    * 1. Choose an adapter:                                                    *
    *    https://sailsjs.com/plugins/databases                                 *
    *                                                                          *
    * 2. Install it as a dependency of your Sails app.                         *
    *    (For example:  npm install sails-mysql --save)                        *
    *                                                                          *
    * 3. Then pass it in, along with a connection URL.                         *
    *    (See https://sailsjs.com/config/datastores for help.)                 *
    *                                                                          *
    ***************************************************************************/
     adapter: 'sails-mysql',
    //adapter: 'sails-mongo',
    //  url: 'mysql://jose:123456@locomproaqui.com/zoebodegas',
    //url: 'mysql://kh1yn4yipz0zec84:gkbelkssgvk0sgvn@en1ehf30yom7txe7.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/d5fh3onnbed1jxem'
    url: "mysql://jgrtn5q36yq629km:tdm6zxfi6m8ztwga@pk1l4ihepirw9fob.cbetxkdyhwsb.us-east-1.rds.amazonaws.com/fd8ff2kcgwy5jceu"
    //url: 'mongodb://jose147:98090871986@cluster0-shard-00-00.vwn6w.mongodb.net:27017,cluster0-shard-00-01.vwn6w.mongodb.net:27017,cluster0-shard-00-02.vwn6w.mongodb.net:27017/dilisaplive?ssl=true&replicaSet=atlas-952z0r-shard-0&authSource=admin&retryWrites=true&w=majority'
     //url: 'mysql://root:@localhost/dilishop',

  },


};
