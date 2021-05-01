import Tag from '../chord_sheet/tag';
import ChordLyricsPair from '../chord_sheet/chord_lyrics_pair';
import Ternary from '../chord_sheet/chord_pro/ternary';
import Literal from '../chord_sheet/chord_pro/literal';

const NEW_LINE = '\n';

/**
 * Formats a song into a ChordPro chord sheet
 */
class ChordProFormatter {
  constructor({ evaluate = false } = {}) {
    this.evaluate = (evaluate === true);
  }

  /**
   * Formats a song into a ChordPro chord sheet.
   * @param {Song} song The song to be formatted
   * @returns {string} The ChordPro string
   */
  format(song) {
    const { lines, metadata } = song;

    return lines
      .map((line) => this.formatLine(line, metadata))
      .join(NEW_LINE);
  }

  formatLine(line, metadata) {
    return line.items
      .map((item) => this.formatItem(item, metadata))
      .join('');
  }

  formatItem(item, metadata) {
    if (item instanceof Tag) {
      return this.formatTag(item);
    }

    if (item instanceof ChordLyricsPair) {
      return this.formatChordLyricsPair(item);
    }

    if (item instanceof Ternary) {
      return this.formatOrEvaluateTernary(item, metadata);
    }

    return '';
  }

  formatOrEvaluateTernary(ternary, metadata) {
    if (this.evaluate) {
      return ternary.evaluate(metadata);
    }

    return this.formatTernary(ternary);
  }

  formatTernary(ternary) {
    const {
      variable,
      valueTest,
      trueExpression,
      falseExpression,
    } = ternary;

    return [
      '%{',
      variable,
      this.formatValueTest(valueTest),
      this.formatExpressionRange(trueExpression),
      this.formatExpressionRange(falseExpression),
      '}',
    ].join('');
  }

  formatValueTest(valueTest) {
    if (!valueTest) {
      return '';
    }

    return `=${valueTest}`;
  }

  formatExpressionRange(expressionRange) {
    if (!expressionRange) {
      return '';
    }

    return `|${expressionRange.map((expression) => this.formatExpression(expression)).join('')}`;
  }

  formatExpression(expression) {
    if (expression instanceof Ternary) {
      return this.formatTernary(expression);
    }

    if (expression instanceof Literal) {
      return expression.string;
    }

    return '';
  }

  formatTag(tag) {
    if (tag.hasValue()) {
      return `{${tag.originalName}: ${tag.value}}`;
    }

    return `{${tag.originalName}}`;
  }

  formatChordLyricsPair(chordLyricsPair) {
    return [
      this.formatChordLyricsPairChords(chordLyricsPair),
      this.formatChordLyricsPairLyrics(chordLyricsPair),
    ].join('');
  }

  formatChordLyricsPairChords(chordLyricsPair) {
    if (chordLyricsPair.chords) {
      return `[${chordLyricsPair.chords}]`;
    }

    return '';
  }

  formatChordLyricsPairLyrics(chordLyricsPair) {
    return chordLyricsPair.lyrics || '';
  }
}

export default ChordProFormatter;
