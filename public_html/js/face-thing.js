class FaceMaker {
    constructor() {
        this.message = "get a job"
        this.imageCollection = {
            heads: [], noses: [], eyes: [],
            brows: [], hairs: [],
            mouths: [], ears: []
        };

        this.canvasController = null;
        this.previewButton = document.querySelector("#preview-button");

        this.previewState = "EDIT";

    }

    setPreview() {

        if (this.previewState === "EDIT") {
            this.previewState = "PREVIEW";
            this.previewButton.innerHTML = "EDIT";
        } else {
            this.previewState = "EDIT";
            this.previewButton.innerHTML = "PREVIEW";
        }
        this.canvasController.changePreviewState(this.previewState);



    }

    placeImages(type) {
        let headTable = document.querySelector(`#${type}`);
        let numImages = 0;
        let idx = 0;
        let ctPerRow = 4;
        let cssClass = "";
        let imgText = "";

        switch (type) {
            case "heads":
                cssClass = "heads-img-cell";
                imgText = '<img class="head-img" src="images/headimg/heads';
                numImages = 8;
                break;
            case "noses":
                cssClass = "noses-img-cell";
                imgText = '<img class="nose-img" src="images/noseimg/noses';
                numImages = 8;
                break;
            case "eyes":
                cssClass = "eyes-img-cell";
                imgText = '<img class="eye-img" src="images/eyesimg/eyes';
                numImages = 6;

                break;
            case "brows":
                cssClass = "brows-img-cell";
                imgText = '<img class="brow-img" src="images/browsimg/brows';
                numImages = 8;

                break;
            case "hairs":
                cssClass = "hairs-img-cell";
                imgText = '<img class="hair-img" src="images/hairimg/hair';
                numImages = 5;

                break;
            case "mouths":
                cssClass = "mouths-img-cell";
                imgText = '<img class="mouth-img" src="images/mouthsimg/mouths';
                numImages = 6;

                break;
            case "ears":
                cssClass = "ears-img-cell";
                imgText = '<img class="ear-img" src="images/earsimg/ears';
                numImages = 6;

                break;


        }


        let numRows = Math.floor(numImages / ctPerRow);
        let leftOver = numImages - numRows * ctPerRow;
        if (leftOver > 0) {
            numRows++;
        }



        for (var i = 0; i < numRows; i++) {

            let row = headTable.insertRow(i);
            for (var r = 0; r < ctPerRow; r++) {

                let currentIdx = idx = idx + 1;

                let cell = row.insertCell(r);
                cell.setAttribute("class", cssClass);
                if (idx <= numImages) {
                    cell.innerHTML = imgText + `${idx}.png">`;
                    let iNode = cell.childNodes[0];

                    this.imageCollection[type].push(iNode);
                    let clickMethod = (ev) => this.selectImage(ev, type, currentIdx - 1);
                    iNode.addEventListener('click', clickMethod)

                }


            }

        }

    };




    selectImage(ev, type, index) {

        this.canvasController.swapImage(type, index);
    }


    init() {
        this.placeImages("heads");
        this.placeImages("noses");
        this.placeImages("eyes");
        this.placeImages('brows');
        this.placeImages('hairs');
        this.placeImages('mouths');
        this.placeImages('ears');
        this.canvasController = new CanvasController(this.imageCollection, { width: 700, height: 800 });
        this.previewButton.addEventListener('click', this.setPreview.bind(this));
    }


}//end class










function init() {

    let maker = new FaceMaker();
    maker.init();

}

init();