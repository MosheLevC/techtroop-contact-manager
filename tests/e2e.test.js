import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const TEST_FILE = "contacts.test.json";
const env = { ...process.env, CONTACTS_FILE: TEST_FILE };

describe("End-to-End CLI Tests", () => {
  // Helper to run the command and return output
  const runCommand = (args) => {
    try {
      return execSync(`node app.js ${args}`, { env, encoding: "utf8" });
    } catch (error) {
      return error.stdout + error.stderr;
    }
  };

  beforeEach(() => {
    // Clean start for each test
    if (fs.existsSync(TEST_FILE)) {
      fs.unlinkSync(TEST_FILE);
    }
  });

  afterAll(() => {
    // Final cleanup
    if (fs.existsSync(TEST_FILE)) {
      fs.unlinkSync(TEST_FILE);
    }
  });

  test("should add a contact and save it to the file", () => {
    const output = runCommand('add "Jane Doe" "jane@example.com" "123-456-7890"');
    
    expect(output).toContain("Contact added: Jane Doe");
    
    const fileContent = JSON.parse(fs.readFileSync(TEST_FILE, "utf8"));
    expect(fileContent).toHaveLength(1);
    expect(fileContent[0].name).toBe("Jane Doe");
  });

  test("should list contacts correctly", () => {
    // Setup file manually
    fs.writeFileSync(TEST_FILE, JSON.stringify([{ name: "John Doe", email: "john@example.com", phone: "555-5555" }]));
    
    const output = runCommand("list");
    
    expect(output).toContain("John Doe - john@example.com - 555-5555");
  });

  test("should delete a contact and update the file", () => {
    fs.writeFileSync(TEST_FILE, JSON.stringify([{ name: "John Doe", email: "john@example.com", phone: "555-5555" }]));
    
    const output = runCommand('delete "john@example.com"');
    
    expect(output).toContain("Contact deleted: John Doe");
    
    const fileContent = JSON.parse(fs.readFileSync(TEST_FILE, "utf8"));
    expect(fileContent).toHaveLength(0);
  });

  test("should search and find a contact", () => {
    fs.writeFileSync(TEST_FILE, JSON.stringify([
      { name: "John Doe", email: "john@example.com", phone: "555-5555" },
      { name: "Jane Smith", email: "jane@example.com", phone: "444-4444" }
    ]));
    
    const output = runCommand('search "Jane"');
    
    expect(output).toContain("Found 1 contact(s) matching: Jane");
    expect(output).toContain("Jane Smith");
  });

  test("should handle invalid commands or arguments", () => {
    const output = runCommand("add 'Only Name'");
    expect(output).toContain("⛔ Error:");
    expect(output).toContain("missing arguments");
  });
});
