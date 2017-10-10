# What's Sketch Emmet?
A plugin that gets Emmet HTML abbreviations snippets to be expanded based on layers list structure and naming.

[Download](https://github.com/joelbqz/sketch-emmet/releases/download/v1.0/EmmetSketch.sketchplugin.zip)

## How it works?
You just need to organize and name your groups/layers correctly using Emmet’s abbreviations syntax, and then go to 
*Plugins » Sketch Emmet » Get Emmet Snippet*

https://vimeo.com/236480843

**NOTE:** In addition to Sketch Emmet you will need to have [Emmet Plugin](https://emmet.io/download/) in your editor favorite to expand the snippets abbreviations properly.

## Tips and tricks

1. Add a % character as prefix if you want to ignore or prevent a layer or group of layers to be copied.

2. If you have a block or a image with a prefix or name as "img" it will automatically add width and height attributes. Example:
  - img
  - img.classname
  - img.classname#id
  - img.classname#id[src=#]

3. Text layers just output the text inside it, unless you asign a proper HTML tag as name. Example:
  - p
  - h1
  - h2
  - h3
  - p.classname
  - p.classname#id
  - p.classname#id[attribute=value]
    
Learn more about Emmet Abbreviations Syntax https://docs.emmet.io/

## Credits
Thanks to Marisa Roque, I was inspired and used some code from his plugin [Sketch Markup Listify](https://github.com/marisaroque/sketch-markup-listify)



## Did it help you? 

[You might want to invite me a coffee](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=XBKEACMEWXXLL&lc=GB&item_name=Sketch%20Emmet%20Plugin&no_note=1&no_shipping=1&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted)
