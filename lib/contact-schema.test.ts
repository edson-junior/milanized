import { describe, expect, it } from 'vitest';
import { ContactSchema } from './contact-schema';

const valid = {
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello, this is a test message.'
};

describe('ContactSchema', () => {
  describe('valid input', () => {
    it('accepts a fully valid payload', () => {
      expect(() => ContactSchema.parse(valid)).not.toThrow();
    });

    it('trims whitespace from name and message fields', () => {
      const result = ContactSchema.parse({
        name: '  John  ',
        email: 'john@example.com',
        message: '  Hello  '
      });
      expect(result.name).toBe('John');
      expect(result.message).toBe('Hello');
    });
  });

  describe('name field', () => {
    it('rejects a name shorter than 2 characters', () => {
      const result = ContactSchema.safeParse({ ...valid, name: 'A' });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(
        'Name must be at least 2 characters.'
      );
    });

    it('rejects a name longer than 100 characters', () => {
      const result = ContactSchema.safeParse({
        ...valid,
        name: 'A'.repeat(101)
      });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(
        'Name is too long (max 100 characters).'
      );
    });

    it('accepts a name exactly 2 characters long', () => {
      expect(() => ContactSchema.parse({ ...valid, name: 'Jo' })).not.toThrow();
    });

    it('accepts a name exactly 100 characters long', () => {
      expect(() =>
        ContactSchema.parse({ ...valid, name: 'A'.repeat(100) })
      ).not.toThrow();
    });
  });

  describe('email field', () => {
    it('rejects a missing @ symbol', () => {
      const result = ContactSchema.safeParse({
        ...valid,
        email: 'notanemail'
      });
      expect(result.success).toBe(false);
    });

    it('rejects an email longer than 80 characters', () => {
      const result = ContactSchema.safeParse({
        ...valid,
        email: `${'a'.repeat(75)}@example.com`
      });
      expect(result.success).toBe(false);
    });

    it('rejects an empty email', () => {
      const result = ContactSchema.safeParse({ ...valid, email: '' });
      expect(result.success).toBe(false);
    });
  });

  describe('message field', () => {
    it('rejects an empty message', () => {
      const result = ContactSchema.safeParse({ ...valid, message: '' });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(
        'Message must not be empty.'
      );
    });

    it('rejects a message longer than 2000 characters', () => {
      const result = ContactSchema.safeParse({
        ...valid,
        message: 'A'.repeat(2001)
      });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(
        'Message is too long (max 2000 characters).'
      );
    });

    it('accepts a message exactly 2000 characters long', () => {
      expect(() =>
        ContactSchema.parse({ ...valid, message: 'A'.repeat(2000) })
      ).not.toThrow();
    });
  });
});
