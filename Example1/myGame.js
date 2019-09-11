room = game.createRoom("room", "배경-1.png") // 방 생성

room.door = room.createObject("door", "문-오른쪽-닫힘.png") // 문 생성
room.door.setWidth(136) // 크기 조절
room.locateObject(room.door, 1049, 300) // 문 배치
room.door.lock() // door 상태를 locked로 변경

room.door.onClick = function() { // door를 클릭했을 때
	if(room.door.isClosed()){ // door가 closed 상태이면
		room.door.open() // door의 상태를 open으로 바꿈
	} else if (room.door.isOpened()){ // door가 opened 상태이면
		game.clear() // 게임 클리어
	} else if (room.door.isLocked()){ // door가 locked 상태이면
		printMessage("문이 잠겨있다") // 메시지 출력
	}
}

room.door.onOpen = function() { // door 상태가 open으로 변경되면 실행
	room.door.setSprite("문-오른쪽-열림.png") // 열린 문으로 변경
}

room.keypad = room.createObject("keypad", "숫자키-우.png") // keypad 생성
room.keypad.setWidth(50) // 크기 조절
room.locateObject(room.keypad, 930, 250) // 위치 변경

room.keypad.onClick = function() {  // keypad를 클릭했을 때
	printMessage("H I")
	showKeypad("number", "7273" , function(){ // 키패드 1 - 숫자4자리
		room.door.unlock() // door의 잠금을 연다
		printMessage("잠금장치가 열리는 소리가 들렸다.")
	 })
}

room.table = room.createObject("table", "테이블-우.png") // 테이블 생성
room.table.setWidth(300)
room.locateObject(room.table, 750, 400)

room.mac = room.createObject("mac", "맥-우.png") // 맥 생성
room.mac.setWidth(130)
room.locateObject(room.mac, 760, 270)
room.mac.onClick = function() {
	showImageViewer("종이.png", "hint.txt"); // 이미지 출력
}

room.key = room.createObject("key", "열쇠.png")
room.key.setWidth(50)
room.locateObject(room.key, 1200, 630)
room.key.onClick = function() {  // key를 클릭했을 때
	room.key.pick()
}

room.paper = room.createObject("paper", "포스트잇.png")  // 종이 생성
room.paper.setWidth(45)
room.locateObject(room.paper, 300, 480)
room.paper.hide()  // paper 숨기기
room.paper.onClick = function() {  // paper를 클릭했을 때
	showImageViewer("ascii.jpg")  // 이미지 출력
}

room.cupboard = room.createObject("cupboard", "찬장-1-닫힘.png")  // cupboard 생성
room.cupboard.setWidth(250)  // 크기 조절
room.locateObject(room.cupboard, 230, 320)  // cupboard 배치
room.cupboard.lock() // cupboard 상태를 locked로 변경

room.cupboard.onClick = function() { // door를 클릭했을 때
	if (room.cupboard.isLocked) {  // cupboard가 잠긴 경우
		if (game.getHandItem() == room.key) {  // 열쇠가 hold 상태이면
			room.cupboard.unlock() // door의 잠금을 연다
			room.cupboard.setSprite("찬장-1-열림.png")  // 열린 그림으로 변경
			printMessage("뭔가 떨어졌다!")
			room.paper.show()  // paper 보이기
		} else {  // 열쇠가 hold 상태가 아니면
			printMessage("잠겨있다")
		}
	} 
}

room.plant = room.createObject("plant", "식물1.png")  // plant 생성
room.plant.setWidth(200)  // 크기 조절
room.locateObject(room.plant, 1200, 450)  // plant 배치

room.plant.move = true // 플래그 변수
room.plant.onClick = function() {  // plant를 클릭했을 때
	printMessage("화분이다.")
}
room.plant.onDrag = function(direction){ // 드래그 모션 direction - Up, Down, Left, Right
	if(direction == "Up" && room.plant.move){ // 오른쪽으로 드래그 했으면
		printMessage("화분을 밀어버렸다!")
		room.plant.moveY(-100) // Y 방향으로 -100 이동
		room.plant.move = false // 이후에는 더 이상 움직이지 않도록 합니다.
	} else {  // 오른쪽 이외 방향
		printMessage("화분이다.")
	}
}

game.start(room) // 게임시작
printMessage("방탈출에 오신 것을 환영합니다!") // 환영 메시지 출력