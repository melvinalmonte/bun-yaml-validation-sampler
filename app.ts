import fs from "fs";
import yaml from "js-yaml";
import { z } from "zod";

// Sample schema
const configSchema = z.object({
  foo: z.string().min(1),
  baz: z.string().min(1),
  pi: z.number().min(3.14).max(3.15),
  some_bool: z.boolean(),
  some_array: z.array(z.string()).min(1),
  some_nesting: z.object({
    object_1: z.object({
      count: z.number().min(1),
      location: z.string().min(1),
    }),
    some_nested_val: z.string().min(1),
  }),
});

// Yaml file loader and converter to object
const formObject = () => {
  try {
    console.log("Reading config.yaml");
    const fileContents = fs.readFileSync("./config.yaml", "utf8");

    console.log("Parsing config.yaml");
    const yamlObject = yaml.load(fileContents);
    return yamlObject;
  } catch (e) {
    console.error(e);
  }
};

// Main function and validation logic
const main = () => {
  const config = formObject();

  const isValid = configSchema.safeParse(config);

  if (isValid.success) {
    console.log("Config is valid");
  } else {
    console.log("Config is invalid", isValid.error.message);
  }
};

main();
