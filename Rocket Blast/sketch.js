var score = 0
var life = 100
var start = 0
var play = 1
var end = 2
var gameState = start
var rocket
var star
var wrench
var meteor
var starGroup
var wrenchGroup
var meteorGroup
var explosion
var lose
var win
var bgSound
var isLose = false
var isWin = false
var mute

function preload() {
    meteorImg = loadImage("assets/meteor_img.png")
    rocketImg = loadImage("assets/rocket_img.png")
    spaceBg = loadImage("assets/space_bg.jpeg")
    starImg = loadImage("assets/star_img.png")
    wrenchImg = loadImage("assets/wrench_img.png")
    explosionImg = loadImage("assets/explosion_img.png")
    lose = loadSound("assets/lose.mp3")
    win = loadSound("assets/win.mp3")
    bgSound = loadSound("assets/sound1.mp3")
}

function setup() {
    createCanvas(800, 800)
    rocket = createSprite(400, 650, 30, 30)
    rocket.addImage("rocket", rocketImg)
    rocket.addImage("explosion", explosionImg)
    rocket.scale = 0.15

    starGroup = new Group()
    wrenchGroup = new Group()
    meteorGroup = new Group()

    mute = createButton("MUTE")
    mute.position(700, 50)
    mute.mouseClicked(muteb)


}

function muteb(){
    if(bgSound.isPlaying()) {
        bgSound.stop()
    }
    else{
        bgSound.play()
    }
}

function draw() {
    background(spaceBg)
    image(spaceBg, 0, -height * 14, width, height * 16)
    camera.position.y = rocket.y - 250

    if (gameState == start) {
        textSize(50)
        fill("white")
        text("Click space bar to start", 180, 400)
        if (keyDown("SPACE")) {
            gameState = play
        }
    }

    if (gameState == play) {
        if (keyDown(UP_ARROW)) {
            rocket.y -= 10
        }

        if (keyDown(LEFT_ARROW) && rocket.x >= 100) {
            rocket.x -= 10
        }

        if (keyDown(RIGHT_ARROW) && rocket.x <= 700) {
            rocket.x += 10
        }
        textSize(20)
        fill("white")
        text("score = " + score, 700, rocket.y - 570)
        text("life = " + life, 700, rocket.y - 600)

        spawnStars()
        spawnWrenches()
        spawnMeteors()

        isTouchingStars()
        isTouchingWrenches()
        isTouchingMeteors()

        if (life <= 0 || rocket.y <= -height * 7) {
            gameState = end

        }

    }

    if (gameState == end) {
        if (life <= 0) {
            gameOver()
            rocket.changeImage("explosion")
            rocket.scale = 1.1

            if (!isLose && !lose.isPlaying()) {
                lose.play();
                isLose = true
                bgSound.stop()
            }
        }


        if (rocket.y <= -height * 7) {
            gameComplete()

            if (!isWin && !win.isPlaying()) {
                win.play()
                isWin = true
            }
        }
    }

    drawSprites()
}

function spawnStars() {
    if (frameCount % 90 == 0) {
        star = createSprite(random(100, 700), random(0, -height * 7), 5, 5)
        star.addImage(starImg)
        star.scale = 0.08
        starGroup.add(star)
    }
}

function spawnWrenches() {
    if (frameCount % 90 == 0) {
        wrench = createSprite(random(100, 700), random(0, -height * 7), 5, 5)
        wrench.addImage(wrenchImg)
        wrench.scale = 0.06
        wrenchGroup.add(wrench)
    }
}

function spawnMeteors() {
    if (frameCount % 30 == 0) {
        meteor = createSprite(random(100, 700), random(0, -height * 7), 5, 5)
        meteor.addImage(meteorImg)
        meteor.scale = 0.06
        meteorGroup.add(meteor)
    }
}

function isTouchingStars() {
    if (rocket.isTouching(starGroup)) {
        score += 10
        for (var i = 0; i < starGroup.length; i++) {
            if (starGroup[i].isTouching(rocket)) {
                starGroup[i].destroy()
            }
        }
    }
}

function isTouchingWrenches() {
    if (rocket.isTouching(wrenchGroup)) {
        life += 30
        for (var i = 0; i < wrenchGroup.length; i++) {
            if (wrenchGroup[i].isTouching(rocket)) {
                wrenchGroup[i].destroy()
            }
        }
    }
}

function isTouchingMeteors() {
    if (rocket.isTouching(meteorGroup)) {
        life -= 25
        for (var i = 0; i < meteorGroup.length; i++) {
            if (meteorGroup[i].isTouching(rocket)) {
                meteorGroup[i].destroy()
            }
        }
    }
}

function gameOver() {
    swal({
        title: `Game Over`,
        text: "Oops you lost the race....!!!",
        imageUrl:
            "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
    },

        function (isConfirm) {
            if (isConfirm) {
                location.reload()
            }
        }

    )
}


function gameComplete() {
    swal({
        title: `Game Over`,
        text: "You have finished the game!",
        imageUrl:
            "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Up_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
    },

        function (isConfirm) {
            if (isConfirm) {
                location.reload()
            }
        }

    )
}





