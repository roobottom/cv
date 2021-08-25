# [Jon Roobottom's CV](https://cv.roobottom.com)

[![Netlify Status](https://api.netlify.com/api/v1/badges/781ceb26-61d4-43c9-aeac-612628bab863/deploy-status)](https://app.netlify.com/sites/jon-roobottom-cv/deploys)

This is my CV. It's primarily a single web page that's built with [11ty](https://11ty.dev) and hosted on Netlify. 

Its party piece is the PDF generation. Each time the build completes, [PrinceXML](https://www.princexml.com/) runs via [a node wrapper](https://www.npmjs.com/package/prince) to combine the CV HTML with a custom PDF CSS. Et voilà, an always-up-to-date CV PDF is produced. 

## Why a PDF and not a print stylesheet?
There's two reason I chose to produce a PDF:

* A PDF means you can better interact with recruiters and online job applications that both expect a single file.
* Styling a PDF with CSS rather gives greater control over layout than print stylesheets alone.

There are some accessibility problems with Prince generated PDF files. However, there is an accessible version available online.