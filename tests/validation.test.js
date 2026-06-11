import { validateCommand } from "../utils/validation.js";

describe("validateCommand", () => {
  describe("add command", () => {
    test("should validate correct add command", () => {
      const result = validateCommand("add", ["John Doe", "john@example.com", "123-456-7890"]);
      expect(result).toEqual({ isValid: true });
    });

    test("should fail if missing arguments", () => {
      const result = validateCommand("add", ["John Doe", "john@example.com"]);
      expect(result.isValid).toBe(false);
      expect(result.message).toBe("missing arguments");
    });

    test("should fail if too many arguments", () => {
      const result = validateCommand("add", ["John Doe", "john@example.com", "123-456-7890", "extra"]);
      expect(result.isValid).toBe(false);
      expect(result.message).toBe("too many arguments");
    });

    test("should fail with invalid email", () => {
      const result = validateCommand("add", ["John Doe", "invalid-email", "123-456-7890"]);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain("invalid email");
    });

    test("should fail with invalid phone", () => {
      const result = validateCommand("add", ["John Doe", "john@example.com", "abc-def-ghij"]);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain("invalid phone");
    });
  });

  describe("list command", () => {
    test("should validate correct list command", () => {
      const result = validateCommand("list", []);
      expect(result).toEqual({ isValid: true });
    });

    test("should fail if arguments are provided", () => {
      const result = validateCommand("list", ["extra"]);
      expect(result.isValid).toBe(false);
      expect(result.message).toBe("too many arguments");
    });
  });

  describe("delete command", () => {
    test("should validate correct delete command", () => {
      const result = validateCommand("delete", ["john@example.com"]);
      expect(result).toEqual({ isValid: true });
    });

    test("should fail if missing email", () => {
      const result = validateCommand("delete", []);
      expect(result.isValid).toBe(false);
      expect(result.message).toBe("missing arguments");
    });

    test("should fail with invalid email", () => {
      const result = validateCommand("delete", ["not-an-email"]);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain("invalid email");
    });
  });

  describe("search command", () => {
    test("should validate search by name", () => {
      const result = validateCommand("search", ["John Doe"]);
      expect(result).toEqual({ isValid: true });
    });

    test("should validate search by email", () => {
      const result = validateCommand("search", ["john@example.com"]);
      expect(result).toEqual({ isValid: true });
    });

    test("should fail if missing query", () => {
      const result = validateCommand("search", []);
      expect(result.isValid).toBe(false);
      expect(result.message).toBe("missing arguments");
    });
  });
});
