# picture_slider

**by nickslick03**

picture_slider formats a picture frame element > picture container element > image elements into a dynamic picture slider.

## Usage

**JS**:

```
let switchSlide = formatPictureSlider(pictureFrame, pictureContainer, height, heightUnit, autoSlideSeconds, maxHeight);
```

pictureFrame : HTML element - contains pictureContainer and images elements.

pictureContainer : HTML element - whose parent is pictureFrame; parent of image elements.

height : number - Represents the height of pictureFrame.

heightUnit : String - Represents the units height parameter is in; currently ``'px'`` and ``'vw'`` are supported.

autoSlideSeconds : number - (Optional) automatically slides pictureSlider to the right every ``autoSlideSeconds`` second.

maxHeight : number - (Optional) sets a maximum height limit on pictureFrame element in pixels.

return value : function - returns a function which takes a parameter of an index, and slides the images slider to the image corresponding to that index.

## Example

**HTML**:

```
<div id="pictureFrame">
	<div id="pictureContainer">
        <img src="./images/download.jpeg" alt=""><img src="./images/download (1).jpeg" alt=""><img src="./images/download (2).jpeg" alt=""><img src="./images/download (3).jpeg" alt="">
	</div>			
</div>
```

**JS**:

```
document.body.onload = () => { formatPictureSlider(document.getElementById('pictureFrame'), document.getElementById('pictureContainer'), 40, 'vw', 3, 400); };
```

**OUTPUT**:

![picture slider result gif](https://media.giphy.com/media/u0FjeyL9R3N5vEbC5i/giphy.gif);

**IMPORTANT**:

insure that ``formatPictureSlider`` is run after the document loads like in the example above using the ``onload`` event. ``formatPictureSlider`` will not work if it is ran before the images load into the document.
