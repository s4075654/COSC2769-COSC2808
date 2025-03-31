const g_coGraphQl = require("graphql")

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

const g_coStudents = new g_coGraphQl.GraphQLObjectType({
	name: "students",
	fields: {
		id: { type: g_coGraphQl.GraphQLID },
		name: { type: g_coGraphQl.GraphQLString },
		major: { type: g_coGraphQl.GraphQLString },
		GPA: { type: g_coGraphQl.GraphQLFloat }
	}
})

Bun.serve({
	fetch: require("graphql-http/lib/use/fetch").createHandler({
		schema: new g_coGraphQl.GraphQLSchema({
			query: new g_coGraphQl.GraphQLObjectType({
				name: "courses",
				fields: {
		       			courses: {
						type: new g_coGraphQl.GraphQLList(g_coStudents),
						args: {
							name: { type: g_coGraphQl.GraphQLString }
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