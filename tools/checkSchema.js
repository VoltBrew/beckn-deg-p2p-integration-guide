const { OpenAPISchemaValidator } = require("openapi-schema-validator");
const jsYaml = require("js-yaml");
const fs = require("fs");

// Load OpenAPI Schema
const OPENAPI_FILE = "../layer2/p2p-energy-trade-deg_1.1.0.yaml"; // Path to the OpenAPI file
const openAPIDocument = jsYaml.load(fs.readFileSync(OPENAPI_FILE, "utf8"));

// Initialize OpenAPI Validator
const validator = new OpenAPISchemaValidator({ version: 3 });

// Validate OpenAPI Document
const openAPIValidationResult = validator.validate(openAPIDocument);

if (openAPIValidationResult.errors.length) {
    console.error("OpenAPI Document is not valid!");
    console.error(openAPIValidationResult.errors);
    process.exit(1);
} else {
    console.log("OpenAPI Document is valid!");
}

// Get the schema for `/on_search` POST requestBody -> application/json
const onSearchSchema =
    openAPIDocument.paths?.["/on_search"]?.post?.requestBody?.content?.[
        "application/json"
        ]?.schema;

if (!onSearchSchema) {
    console.error("No schema found for /on_search requestBody.");
    process.exit(1);
}

// Initialize AJV with JSON Schema Validation
const Ajv = require("ajv").default;
const addFormats = require("ajv-formats");

const ajv = new Ajv({ strict: false, allErrors: true });
addFormats(ajv);

// Compile AJV Validator for the extracted schema
const validate = ajv.compile(onSearchSchema);

// Example: Body to validate
const bodyToValidate = {
    query: "example query",
    filters: ["filter1", "filter2"],
};

// Validate the JSON body
const isValid = validate(bodyToValidate);

if (isValid) {
    console.log("Body validation succeeded: The JSON body is valid!");
} else {
    console.error("Body validation failed: The JSON body is invalid!");
    console.error(validate.errors);
}