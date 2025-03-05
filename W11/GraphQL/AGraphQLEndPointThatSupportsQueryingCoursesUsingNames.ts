import { createHandler } from "graphql-http/lib/use/fetch"
import { GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLList } from "graphql"

const students = [
	{ id: 1, name: "Alice", major: "IT", GPA: 3.3 },
	{ id: 2, name: "Bob", major: "SE", GPA: 3.2 },
	{ id: 3, name: "Carol", major: "SE", GPA: 2.8 },
	{ id: 4, name: "David", major: "IT", GPA: 3.1 },
];
const courses = [
  { name: "Full Stack Dev", credits: 12 },
  { name: "Database Applications", credits: 12 },
  { name: "Capstone Project", credits: 24 },
];

const g_coStudents = new GraphQLObjectType({
	name: "students",
	fields: {
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		major: { type: GraphQLString },
		GPA: { type: GraphQLFloat }
	}
})

Bun.serve({
	fetch: createHandler({
		schema: new GraphQLSchema({
			query: new GraphQLObjectType({
				name: "courses",
				fields: {
		       			courses: {
						type: new GraphQLList(g_coStudents),
						args: {
							name: { type: GraphQLString }
						},
						resolve() {
							return students
						}
					}
				}
			})
		})
	})
})