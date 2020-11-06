class CanvasController {

    constructor(imageCollection, params) {
        this.imageCollection = imageCollection;
        this.params = params;
        this.mode = 'EDIT'; //EDIT or PREVIEW
        this.registerCounter = 0;
        let me = this;
        this.groupsCollection = {
            head: {
                group: null, idx: 0, initPos: {
                    x: 50, y: 20, width: 500, height: 500

                }
            },
            nose: {
                group: null, idx: 0, initPos: {
                    x: 200, y: 50, width: 150, height: 300

                }
            },
            leftEye: {
                group: null, idx: 0, initPos: {
                    x: 320, y: 140, width: 200, height: 100

                }
            },
            rightEye: {
                group: null, idx: 0, initPos: {
                    x: 250, y: 140, width: 200, height: 100

                }
            },
            leftBrow: {
                group: null, idx: 0, initPos: {
                    x: 290, y: 90, width: 200, height: 100

                }
            },
            rightBrow: {
                group: null, idx: 0, initPos: {
                    x: 270, y: 90, width: 200, height: 100

                }
            },
            mouth: {
                group: null, idx: 0, initPos: {
                    x: 180, y: 300, width: 200, height: 100

                }
            },
            hair: {
                group: null, idx: 0, initPos: {
                    x: 50, y: -50, width: 500, height: 500
                }

            },
            leftEar: {
                group: null, idx: 0, initPos: {
                    x: 470, y: 170, width: 100, height: 175

                }
            },
            rightEar: {
                group: null, idx: 0, initPos: {
                    x: 110, y: 170,  width: 100, height: 175

                }
            }

        }
        let gKeys = Object.keys(this.groupsCollection);
        for (var j = 0; j < gKeys.length; j++) {
            this.groupsCollection[gKeys[j]].initPos.y += 150;
            this.groupsCollection[gKeys[j]].initPos.x += 20;

        }




        this.stage = new Konva.Stage({
            container: 'konvaContainer',
            width: params.width,
            height: params.height

        });
        this.layer = new Konva.Layer();
        this.stage.add(this.layer);

        let headImage = this.imageCollection['heads'][0];
        this.groupsCollection.head.group =
            this.initializeImage(this.groupsCollection.head, headImage.src, 'head');


        let hairImage = this.imageCollection['hairs'][0];
        this.groupsCollection.hair.group =
            this.initializeImage(this.groupsCollection.hair, hairImage.src, 'hair');


        let mouthImage = this.imageCollection['mouths'][0];
        this.groupsCollection.mouth.group =
            this.initializeImage(this.groupsCollection.mouth, mouthImage.src, 'mouth');

        let noseImage = this.imageCollection['noses'][0];
        this.groupsCollection.nose.group =
            this.initializeImage(this.groupsCollection.nose, noseImage.src, 'nose');

        //flip
        let leftEyeImage = this.imageCollection['eyes'][0];
        this.groupsCollection.leftEye.group =
            this.initializeImage(this.groupsCollection.leftEye, leftEyeImage.src, 'leftEye');

        let rightEyeImage = this.imageCollection['eyes'][0];
        this.groupsCollection.rightEye.group =
            this.initializeImage(this.groupsCollection.rightEye, rightEyeImage.src, 'rightEye');

        //flip    
        let leftBrowImage = this.imageCollection['brows'][0];
        this.groupsCollection.leftBrow.group =
            this.initializeImage(this.groupsCollection.leftBrow, leftBrowImage.src, 'leftBrow');

        let rightBrowImage = this.imageCollection['brows'][0];
        this.groupsCollection.rightBrow.group =
            this.initializeImage(this.groupsCollection.rightBrow, rightBrowImage.src, 'rightBrow');
        //flip
        let leftEarImage = this.imageCollection['ears'][0];
        this.groupsCollection.leftEar.group =
            this.initializeImage(this.groupsCollection.leftEar, leftEarImage.src, 'leftEar');

        let rightEarImage = this.imageCollection['ears'][0];
        this.groupsCollection.rightEar.group =
            this.initializeImage(this.groupsCollection.rightEar, rightEarImage.src, 'rightEar');


    }

    changePreviewState(previewState) {
        this.mode = previewState;
        let me = this;
        // imageGroup.find('Circle').each(c => {c.opacity(1)})
        let circles = this.layer.find('Circle');
        let images = this.layer.find('Image');
        let opc = 1;


        if (this.mode === "PREVIEW") {
            opc = 0;
        }
        circles.each(c => { c.opacity(opc) });

        images.each((img) => {
            if (me.mode === "EDIT")
                img.strokeEnabled(true);
            else
                img.strokeEnabled(false);
        })





        this.layer.draw();

    }

    addAnchor(group, x, y, name, flipped) {
        let stage = group.getStage();
        let layer = group.getLayer();
        let me = this;

        let anchor = new Konva.Circle({
            x: x,
            y: y,
            stroke: '#666',
            fill: '#ddd',
            opacity: 1,
            strokeWidth: 2,
            radius: 8,
            name: name,
            draggable: true,
            dragOnTop: false,
        });

        anchor.on('dragmove', function () {
            if (flipped) {
                me.updateFlipped(this);
            } else {
                me.update(this);
            }

            layer.draw();
        });
        anchor.on('mousedown touchstart', function () {
            group.draggable(false);
            //this.moveToTop();
        });
        anchor.on('dragend', function () {
            group.draggable(true);
            layer.draw();
        });
        /* add hover styling
        anchor.on('mouseover', function () {
          let layer = this.getLayer();
          document.body.style.cursor = 'pointer';
          this.strokeWidth(4);
          layer.draw();
        });
        anchor.on('mouseout', function () {
          let layer = this.getLayer();
          document.body.style.cursor = 'default';
          this.strokeWidth(2);
          layer.draw();
        });
        */

        group.add(anchor);
    }

    updateFlipped(activeAnchor) {
        this.update(activeAnchor, true)
    }

    update(activeAnchor, flipped) {
        let group = activeAnchor.getParent();

        let topLeft = group.find('.topLeft')[0];
        let bottomRight = group.find('.bottomRight')[0];
        let topRight = group.find('.topRight')[0];
        let bottomLeft = group.find('.bottomLeft')[0];

        let image = group.find('Image')[0];


        let anchorX = activeAnchor.getX();
        let anchorY = activeAnchor.getY();

        switch (activeAnchor.getName()) {
            case 'topLeft':
                topRight.y(anchorY);
                bottomLeft.x(anchorX);
                break;
            case 'topRight':
                topLeft.y(anchorY);
                bottomRight.x(anchorX);
                break;
            case 'bottomRight':
                bottomLeft.y(anchorY);
                topRight.x(anchorX);
                break;
            case 'bottomLeft':
                bottomRight.y(anchorY);
                topLeft.x(anchorX);
                break;
        }


        image.position(topLeft.position());
        var width = topRight.getX() - topLeft.getX();
        var height = bottomLeft.getY() - topLeft.getY();
        if (width && height) {
            image.width(width);
            image.height(height);
        }

        if (flipped) {

            let ss = image.scale();
            if (ss.x > 0) {
                image.scale({ x: -ss.x, y: ss.y })
            }
            image.x(image.x() + width);

        }



    }

    initializeImage(imageInfo, imageSrc, imageType) {
        let me = this;
        let konvaImage = new Konva.Image({
            width: imageInfo.initPos.width,
            height: imageInfo.initPos.height,
            stroke: 'red',
            strokeWidth: .35
        });
        konvaImage.on('mouseenter', () => {
            me.stage.container().style.cursor = 'move';

        })
        konvaImage.on('mouseleave', () => {
            me.stage.container().style.cursor = 'default';

        })
        let imgItem = new Image();
        imgItem.onload = () => {

            konvaImage.image(imgItem);

            me.registerInit();

        }
        imgItem.src = imageSrc;
        let imageGroup = new Konva.Group({
            x: imageInfo.initPos.x, y: imageInfo.initPos.y, draggable: true
        });
        imageGroup.add(konvaImage);
        imageGroup.setAttr("imageType", imageType);
        this.layer.add(imageGroup);

        if (imageType === 'leftEye' || imageType === 'leftBrow' || imageType === 'leftEar') {
            console.log(`flipped ${imageType}`)
            this.addAnchor(imageGroup, -imageInfo.initPos.width, 0, 'topLeft', true);
            this.addAnchor(imageGroup, 0, imageInfo.initPos.height, 'bottomRight', true);
            this.addAnchor(imageGroup, 0, 0, 'topRight', true);
            this.addAnchor(imageGroup, -imageInfo.initPos.width, imageInfo.initPos.height, 'bottomLeft', true);
        } else {
            this.addAnchor(imageGroup, 0, 0, 'topLeft');
            this.addAnchor(imageGroup, imageInfo.initPos.width, imageInfo.initPos.height, 'bottomRight');
            this.addAnchor(imageGroup, imageInfo.initPos.width, 0, 'topRight');
            this.addAnchor(imageGroup, 0, imageInfo.initPos.height, 'bottomLeft');

        }



        //imageGroup.find('Circle').each(c => {c.opacity(1)})

        return imageGroup;

    }

    registerInit() {
        this.registerCounter++;
        if (this.registerCounter === Object.keys(this.groupsCollection).length)
            this.initialDraw();

    }


    swapImage(groupType, index) {

        let me = this;
        let newImage;
        let i1, i2;
        let foundImage = this.imageCollection[groupType][index];



        if (groupType === 'eyes') {
            i1 = this.groupsCollection["leftEye"].group.find('Image')[0];
            i2 = this.groupsCollection["rightEye"].group.find('Image')[0];
            newImage = new Image();
            newImage.onload = function () {

                i1.image(newImage);
                i2.image(newImage);
                me.layer.draw();

            };
            newImage.src = foundImage.src;
            return;
        }


        if (groupType === 'brows') {
            i1 = this.groupsCollection["leftBrow"].group.find('Image')[0];
            i2 = this.groupsCollection["rightBrow"].group.find('Image')[0];
            newImage = new Image();
            newImage.onload = function () {

                i1.image(newImage);
                i2.image(newImage);
                me.layer.draw();

            };
            newImage.src = foundImage.src;
            return;
        }
        if (groupType === 'ears') {
            i1 = this.groupsCollection["leftEar"].group.find('Image')[0];
            i2 = this.groupsCollection["rightEar"].group.find('Image')[0];
            newImage = new Image();
            newImage.onload = function () {

                i1.image(newImage);
                i2.image(newImage);
                me.layer.draw();

            };
            newImage.src = foundImage.src;
            return;
        }



        let groupKey = "";

        switch (groupType) {
            case "heads":
                groupKey = "head";
                break;

            case "noses":
                groupKey = "nose";
                break;
            case "mouths":
                groupKey = "mouth";
                break;
            case "hairs":
                groupKey = "hair";
                break;
            default:
                break;


        };


        let currentKonvaImage = this.groupsCollection[groupKey].group.find('Image')[0];
        newImage = new Image();
        newImage.onload = function () {

            currentKonvaImage.image(newImage)
            me.layer.draw();

        };

        newImage.src = foundImage.src;



    }


    initialDraw() {
        let me = this;
        let imgKeys = Object.keys(this.groupsCollection);
        for (let t = 0; t < imgKeys.length; t++) {
            let imageType = imgKeys[t];
            let bodyPartData = this.groupsCollection[imageType];
            let group = bodyPartData.group;


            if (group != null) {
                let img = group.find('Image')[0];



                if (imageType === 'leftEye' || imageType === 'leftBrow' || imageType === 'leftEar' ) {
                    let ss = img.scale();
                    img.scale({ x: -ss.x, y: ss.y })
                }

                img.y(bodyPartData.y);
                img.x(bodyPartData.x);



            }


            // on off for  resize control


        }


        me.layer.draw();

    }



}