# ember-cli-happy-splitter

Basic addon that implements a split panel (AKA split view, split container).  It tries to have very little opinion 
 about the container and the nested views.
 
Why is it happy?  Because there are no content security provider violations! &#9786;

## Installation

With npm:

`npm install --save ember-cli-happy-splitter`

Or with Ember CLI:

`ember install:npm ember-cli-happy-splitter`

## Examples

### Vertical Splitter

````htmlbars
{{#split-container isVertical=true}}
  {{#split-view}}
    <h2>hello from left panel!</h2>
  {{/split-view}}{{!-- This comment is the least invasive way to prevent spaces between the view and the bar.
  --}}{{splitter-bar}}{{!-- This comment is the least invasive way to prevent spaces between the bar and the view.
  --}}{{#split-view}}
    <h2>hello from right panel!</h2>
  {{/split-view}}
{{/split-container}}
````

Note the comments between the elements. The split-container uses a simple inline-block layout. When using a vertical
splitter, browsers will interpret the line breaks as meaningful syntax. Using comments is the least invasive way to 
prevent extra space between the elements. Refer to [this article](https://css-tricks.com/fighting-the-space-between-inline-block-elements/)
 for more information.

The isVertical variable defaults to true and is optional in this scenario.

### Horizontal Splitter

````htmlbars
{{#split-container isVertical=false}}
  {{#split-view}}
    <h2>hello from top panel!</h2>
  {{/split-view}}
  {{splitter-bar}}
  {{#split-view}}
    <h2>hello from bottom panel!</h2>
  {{/split-view}}
{{/split-container}}
````

### Customizing Splitter Width

````htmlbars
{{#split-container isVertical=true splitterWidth=10}}
  {{#split-view}}
    <h2>hello from left panel!</h2>
  {{/split-view}}{{!-- This comment is the least invasive way to prevent spaces between the view and the bar.
  --}}{{splitter-bar}}{{!-- This comment is the least invasive way to prevent spaces between the bar and the view.
  --}}{{#split-view}}
    <h2>hello from right panel!</h2>
  {{/split-view}}
{{/split-container}}
````

This will create a splitter 10px wide.

### Customizing Split Amounts

````htmlbars
{{#split-container isVertical=true}}
  {{#split-view splitPercentage=25}}
    <h2>hello from left panel!</h2>
  {{/split-view}}{{!-- This comment is the least invasive way to prevent spaces between the view and the bar.
  --}}{{splitter-bar}}{{!-- This comment is the least invasive way to prevent spaces between the bar and the view.
  --}}{{#split-view splitPercentage=75}}
    <h2>hello from right panel!</h2>
  {{/split-view}}
{{/split-container}}
````

Annotate each panel with the desired split percentage. Percentages need to add up to 100.

## To Do

* Add some tests
* Add more example templates to the dummy app
* Handle nested panels
* Handle more than 2 panels in a container
* Add widget handles to splitter
* Validate split percentages add up to 100

## License

MIT license
