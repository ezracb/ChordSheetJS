import ChordProParser from '../../src/parser/chord_pro_parser';
import ChordProFormatter from '../../src/formatter/chord_pro_formatter';

describe('chordpro e2e', () => {
  it('correctly parses and evaluates meta expressions', () => {
    const chordSheet = `
{title: A}
{artist: B}
%{title}
%{artist|%{}}
%{artist=X|artist is X|artist is not X}
%{c|c is set|c is unset}
%{artist|artist is %{}|artist is unset}
%{title|title is set and c is %{c|set|unset}|title is unset}`.substring(1);

    const expectedEvaluation = `
{title: A}
{artist: B}
A
B
artist is not X
c is unset
artist is B
title is set and c is unset`.substring(1);

    const song = new ChordProParser().parse(chordSheet);
    const formatted = new ChordProFormatter({ evaluate: true }).format(song);

    expect(formatted).toEqual(expectedEvaluation);
  });

  it('correctly parses and formats meta expressions', () => {
    const chordSheet = `
{title: A}
{artist: B}
%{title}
%{artist|%{}}
%{artist=X|artist is X|artist is not X}
%{c|c is set|c is unset}
%{artist|artist is %{}|artist is unset}
%{title|title is set and c is %{c|set|unset}|title is unset}`.substring(1);

    const song = new ChordProParser().parse(chordSheet);
    const formatted = new ChordProFormatter({ evaluate: false }).format(song);

    expect(formatted).toEqual(chordSheet);
  });
});
