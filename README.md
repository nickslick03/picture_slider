# picture_slider

## by nickslick03

picture_slider formats a picture frame element > picture container element > image elements into a dynamic picture slider.

# Usage

**JS**:

```
formatPictureSlider(pictureFrame, pictureContainer, height, heightUnit, autoSlideSeconds, maxHeight);
```

pictureFrame : HTML element - contains pictureContainer and images elements.

pictureContainer : HTML element - whose parent is pictureFrame; parent of image elements.

height : number - Represents the height of pictureFrame.

heightUnit : String - Represents the units height parameter is in; currently ``'px'`` and ``'vw'`` are supported.

autoSlideSeconds : number - (Optional) automatically slides pictureSlider to the right every ``autoSlideSeconds`` second.

maxHeight : number - (Optional) sets a maximum height limit on pictureFrame element in pixels.











