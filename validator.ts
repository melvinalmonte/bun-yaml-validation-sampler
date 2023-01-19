import Ajv from "ajv";

import { readFileSync } from "fs";
import yaml from "js-yaml";
import {argv, exit } from "process";

const schema = require("./schema.json");

const extractObjectFromYamlFile = (filePath: string): any => {
  try {
    const yamlFileContent = readFileSync(filePath, "utf8");
    const yamlObject = yaml.load(yamlFileContent);
    return yamlObject;
  } catch (e) {
    throw new Error(`Error while reading yaml file: ${e}`);
  }
};

const isSchemaValid = (schema: any, data: any): void => {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const isValid = validate(data);
  if (!isValid) {
    console.error("Validation unsuccessful, errors: \n", JSON.stringify(validate.errors, null, 2));
    exit(1);
  }
  console.log("YAML validation successful");
  exit(0);
};

const main = (): void => {
  const [yamlFile] = argv.slice(2);
  if (!yamlFile) {
    throw new Error("Please provide a yaml file");
  }
  const yamlObject = extractObjectFromYamlFile(yamlFile);
  isSchemaValid(schema, yamlObject);

};
main();
