import { describe, expect, it } from 'vitest';
import { cn, formatDate, slugify } from './utils';

describe('cn', () => {
  it('returns a single class unchanged', () => {
    expect(cn('foo')).toBe('foo');
  });

  it('joins multiple classes', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('resolves tailwind conflicts (last wins)', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2');
  });

  it('filters out falsy values', () => {
    expect(cn('foo', false, undefined, null, 'bar')).toBe('foo bar');
  });

  it('handles conditional object syntax', () => {
    expect(cn({ 'text-red-500': true, 'text-blue-500': false })).toBe(
      'text-red-500'
    );
  });
});

describe('slugify', () => {
  it('lowercases the string', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('replaces spaces with hyphens', () => {
    expect(slugify('foo bar baz')).toBe('foo-bar-baz');
  });

  it('replaces non-word characters (trailing punctuation trimmed)', () => {
    expect(slugify('Hello, World!')).toBe('hello-world');
  });

  it('collapses consecutive non-word chars into one hyphen', () => {
    expect(slugify('foo  --  bar')).toBe('foo-bar');
  });

  it('strips leading hyphens', () => {
    expect(slugify('--leading')).toBe('leading');
  });

  it('strips trailing hyphens', () => {
    expect(slugify('trailing--')).toBe('trailing');
  });

  it('handles already-slug strings', () => {
    expect(slugify('already-a-slug')).toBe('already-a-slug');
  });

  it('handles an empty string', () => {
    expect(slugify('')).toBe('');
  });
});

describe('formatDate', () => {
  it('formats a date in en-GB long format', () => {
    // 1 January 2024
    const date = new Date(2024, 0, 1);
    expect(formatDate(date)).toBe('1 January 2024');
  });

  it('formats a date in the middle of the year', () => {
    const date = new Date(2023, 5, 15); // 15 June 2023
    expect(formatDate(date)).toBe('15 June 2023');
  });

  it('formats a single-digit day without padding', () => {
    const date = new Date(2022, 2, 7); // 7 March 2022
    expect(formatDate(date)).toBe('7 March 2022');
  });
});
