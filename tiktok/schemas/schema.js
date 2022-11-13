// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";
import comment from "./comment";
import post from "./post";
import postedBy from "./postedBy";
import user from "./user";
// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",

  types: schemaTypes.concat([comment, user, postedBy, post]),
});
