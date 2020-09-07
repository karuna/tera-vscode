const { prettifyTera } = require("../lib/format");

describe("Tera formatter", () => {
  it("basic formatting", () => {
    expect(
      prettifyTera({
        code: `<div>{%
  for img in [1, 2, 3, 4] %}
    <img src="{{img}}.jpg" >
{%endfor  %}
   </div>`,
      })
    ).toBe(
      `<div>
  {% for img in [1, 2, 3, 4] %}
    <img src="{{ img }}.jpg"/>
  {% endfor %}
</div>`
    );
  });

  it("self-closing tags", () => {
    expect(
      prettifyTera({
        code: `<br><img alt="something"
src="foo.gif"><input />`,
      })
    ).toBe(`<br/><img alt="something" src="foo.gif"/><input/>`);
  });

  it("doesn’t disrupt code formatting", () => {
    expect(
      prettifyTera({
        code: "<pre><code>  2 spaces\n\t\t2 tabs\n   3 spaces </code></pre>",
      })
    ).toBe("<pre><code>  2 spaces\n\t\t2 tabs\n   3 spaces </code></pre>");
  });
});
