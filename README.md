# jr-hint

This is a small web component that allows you to display custom messages when hovering elements.
It has very minimal styling, so up to you to style it to your liking.

##Install

```bash
npm install jr-hint
```

## Import

```js
import 'jr-hint';
```

or

```html
<script src="node_modules/jr-hint" type="module"></script>
```

## Usage

Use an id or class name as the attribute name, and the message as the value. Message will be attached to all elements with that class name.

```html
<div id="square"></div>
<div class="circle"></div>
<div class="circle"></div>

<jr-hint
	#square="A square message..."
	.circle="A circular message..."
></jr-hint>
```

Add attribute <code>console</code> to display messages in the console instead of the default tooltip.

```html

## Styling example

```css
jr-hint {
    color: magenta;
}