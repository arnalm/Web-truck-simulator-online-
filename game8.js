import * as THREE from '../jsm/three.module.js';
import { OrbitControls }from './jsm/OrbitControls.js';
import * as CANNON from '../jsm/cannon-es.js';
import CannonDebugRenderer from "./jsm/CannonDebugRenderer.js";
import { GLTFLoader } from "./jsm/GLTFLoader.js";

//import {Water} from "./jsm/Water.js";







const scene = new THREE.Scene();




const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
//cameraA

const renderer = new THREE.WebGLRenderer({
  antialias: true,
 powerPreference: "high-performance" //
});

/*
const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({
  canvas,
  //alpha: true,
  //premultipliedAlpha: false,
  antialias: true
});
*/

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

  








//reload 

const reload =document.getElementById('reload');
reload.addEventListener('touchstart',function(){
	
	location.reload();
	
})


const move = document.getElementById('move');

const move1 = document.getElementById('move1');
move1.addEventListener('touchstart', function() {
  const maxForce = 100;
  const force = maxForce;
  vehicle.applyEngineForce(-force, 0);
  vehicle.applyEngineForce(-force, 1);
  vehicle.applyEngineForce(-force, 2);
  vehicle.applyEngineForce(-force, 3);

});
move1.addEventListener('touchend', function() {
  const maxForce = 0;
  const force = maxForce;
  
  
  vehicle.applyEngineForce(-force, 0);
  vehicle.applyEngineForce(-force, 1);
  
  vehicle.applyEngineForce(-force, 2);
  vehicle.applyEngineForce(-force, 3);
  
});





move.addEventListener('touchstart', function() {
const maxForce = 100;
const brakeForce = 5;

const force = maxForce ;

vehicle.setBrake(0, 0);
vehicle.setBrake(0, 1);
vehicle.setBrake(0, 2);
vehicle.setBrake(0, 3);

vehicle.setBrake(brakeForce, 0);
vehicle.setBrake(brakeForce, 1);
vehicle.setBrake(brakeForce, 2);
vehicle.setBrake(brakeForce, 3);

})

move.addEventListener('touchend', function() {
	const maxForce = 1;
	const brakeForce = 0;
	
	const force = maxForce;

vehicle.setBrake(0, 0);
vehicle.setBrake(0, 1);
vehicle.setBrake(0, 2);
vehicle.setBrake(0, 3);

vehicle.setBrake(brakeForce, 0);
vehicle.setBrake(brakeForce, 1);
vehicle.setBrake(brakeForce, 2);
vehicle.setBrake(brakeForce, 3);

	
})




//------------------------------

const joystick = new JoyStick({
  game: this,
  onMove: onMove
});


  
  
  
function onMove( forward, turn ){
  const maxSteerVal = 1;
  
  const maxForce = 30;
  const brakeForce = 5;

  const force = maxForce * forward;
  
  const steer = maxSteerVal * -turn;

vehicle.applyEngineForce(-force, 0);
vehicle.applyEngineForce(-force, 1);

vehicle.applyEngineForce(-force, 2);
vehicle.applyEngineForce(-force, 3);
    
 
    
   
  if (forward!=0){
  	




    
    
  }else{

  }

  vehicle.setSteeringValue(steer, 0);
  vehicle.setSteeringValue(steer, 1); 
  
  
};










//-----------------------------



const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -9.82, 0),
});
const  CannonD = new CannonDebugRenderer(scene, world);



let water;


// Water
/*
const waterGeometry = new THREE.PlaneGeometry( 100, 100 );

water = new Water(
 waterGeometry,{
 textureWidth: 512,
	textureHeight: 512,
waterNormals: new THREE.TextureLoader().load( '/img/waternormals.jpg', function ( texture ) {
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

	} ),
sunDirection: new THREE.Vector3(),
sunColor: 0xffffff,
waterColor: 0x001e0f,
distortionScale: 3.7,
fog: scene.fog !== undefined
});

water.rotation.x = - Math.PI / 2;
water.position.set(0,2,150)
scene.add( water );

*/







//_______

const s = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(0.8)
});

world.addBody(s)
//_______game over function____ 
var geometry = new THREE.BoxGeometry(3, 1, 2); 
var material = new THREE.MeshLambertMaterial({ 
   color:'gray'
}); 

var mesh = new THREE.Mesh(geometry, material); 
scene.add(mesh); 
 

var light = new THREE.AmbientLight(0xffffff,2);
scene.add(light);

//Point light => shading the front face 
var light1 = new THREE.PointLight(0xffffff, 0.2);
scene.add(light1);




 




  
















//gameover 














//__________________
  var geometry = new THREE.BoxGeometry(1, 1,1); 
var material = new THREE.MeshLambertMaterial({ 
   color: 'gray'
}); 
  var meshCamera = new THREE.Mesh(geometry, material); 
  scene.add(meshCamera); 
 meshCamera.visible = false;

//_______________

const chassisShape1 = new CANNON.Box(new CANNON.Vec3(2.5, 0.5, 1));
let chassisBody,chassisShape;
 chassisShape = new CANNON.Box(new CANNON.Vec3(4, 0.5, 1))

 chassisBody = new CANNON.Body({ mass: 150 })

 const chassisBody1 = new CANNON.Body({ mass: 150 })

chassisBody.addShape(chassisShape)
chassisBody.addShape(chassisShape1)
chassisBody1.addShape(chassisShape1)
//ArnalA
chassisBody.position.set(180.3, 3.1, -70);
//chassisBody.position.set(200.3, 7.8, -80)


chassisBody.angularVelocity.set(0, 0, 0)
world.addBody(chassisBody)

//______________________________
const vehicle = new CANNON.RaycastVehicle({
  chassisBody,
})


const vehicle1 = new CANNON.RigidVehicle({
  chassisBody,chassisBody1
})
      

const mass =1;
const mass1 = 0;
const axixWhidth = 5;
const wheelA =new CANNON.Box(new CANNON.Vec3(1,0.5,1));
const wheelB =new CANNON.Box(new CANNON.Vec3(1,0.5,0.5));
const wheelMaterial1 = new CANNON.Material('ground');
const down = new CANNON.Vec3(0,-1,0);


let wheelBodyA1,wheelBodyA2,wheelBodyA3;
wheelBodyA1 = new CANNON.Body({
  mass,
  wheelMaterial1,
});
wheelBodyA1 = new CANNON.Body({ mass: 60 })
wheelBodyA1.addShape(wheelA);
vehicle1.addWheel({
  body:wheelBodyA1,
  position:new CANNON.Vec3(-0.5,1,0),
  axis: new CANNON.Vec3(0,0,0),
  direction:down
})
wheelBodyA1.angularFactor.set(0, 0, 1);

//fg













/*
 wheelBodyA2 = new CANNON.Body({
   mass,
   wheelMaterial1,
});
wheelBodyA2.addShape(wheelB);
 vehicle1.addWheel({
  body:wheelBodyA2,
  position:new CANNON.Vec3(2.1,0,0),
   axis: new CANNON.Vec3(0,0,1),
   direction:down
 })


 wheelBodyA3 = new CANNON.Body({
   mass,
   wheelMaterial1,
 });
wheelBodyA3.addShape(wheelB);
 vehicle1.addWheel({
  body:wheelBodyA3,
   position:new CANNON.Vec3(0.8,-0.4,-1),
  axis: new CANNON.Vec3(0,0,1),
 direction:down
 })

*/

vehicle1.addToWorld(world)

//_______________________________

 


 
 











//_______
const wheelOptions = {
  radius: 0.5,
  directionLocal: new CANNON.Vec3(0, -1, 0),
  suspensionStiffness: 30,
  suspensionRestLength: 0.3,
  frictionSlip: 1.4,
  dampingRelaxation: 0.9,
  dampingCompression: 0.9,
  maxSuspensionForce: 100000,
  rollInfluence: 0.01,
  axleLocal: new CANNON.Vec3(0, 0, 1),
  chassisConnectionPointLocal: new CANNON.Vec3(-1, 0, 1),
  maxSuspensionTravel: 0.3,
  customSlidingRotationalSpeed: -30,
  useCustomSlidingRotationalSpeed: true,
}


wheelOptions.chassisConnectionPointLocal.set(-3.6, -0.3, 1)
vehicle.addWheel(wheelOptions)


wheelOptions.chassisConnectionPointLocal.set(-3.6, -0.3, -1)
vehicle.addWheel(wheelOptions)

wheelOptions.chassisConnectionPointLocal.set(2.3, -0.3, 1)
vehicle.addWheel(wheelOptions)

wheelOptions.chassisConnectionPointLocal.set(2.3, -0.3, -1)

vehicle.addWheel(wheelOptions)




vehicle.addToWorld(world)



      // Add the wheel bodies
  
  
  









  
  
  
  //******************************
  const wheelBodies = []
  
  
  let wi;
   wi = new CANNON.Sphere(0.6)
   
  
   
   
  const wheelMaterial = new CANNON.Material('wheel')
        
  vehicle.wheelInfos.forEach((wheel)=>{
  // const cylinderShape = new CANNON.Cylinder(wheel.radius, wheel.radius, wheel.radius / 2, 20)
  // //wheel.radius, wheel.radius, wheel.radius / 2, 20
  
  
  const wheelBody = new CANNON.Body({
    mass: 0,
    material: wheelMaterial,
  })
  wheelBody.type = CANNON.Body.KINEMATIC
  wheelBody.collisionFilterGroup = 0
  
  
  
  
  
  
  
  
  
  const quaternion = new CANNON.Quaternion().setFromEuler(-Math.PI / 2, 0, 0)
  
  
  
   
  
  
  
  wheelBody.addShape(wi, new CANNON.Vec3(), quaternion)
  wheelBodies.push(wheelBody)
  world.addBody(wheelBody)
 
    
  })







        //
  world.addEventListener('postStep',() =>{
  for (let i = 0; i < vehicle.wheelInfos.length; i++){
    
    
  vehicle.updateWheelTransform(i)
  
  const transform = vehicle.wheelInfos[0].worldTransform
 
  const wheelBody = wheelBodies[0]
  wheelBody.position.copy(transform.position)
  wheelBody.quaternion.copy(transform.quaternion)
  //-----------
 tire1.position.copy(transform.position)
 tire1.quaternion.copy(transform.quaternion)
 
 
   //-----1
   const transform1 = vehicle.wheelInfos[1].worldTransform
  
  const wheelBody1 = wheelBodies[1]
  wheelBody1.position.copy(transform1.position)
  wheelBody1.quaternion.copy(transform1.quaternion)
 
 tire2.position.copy(transform1.position)
 tire2.quaternion.copy(transform1.quaternion)
 
 
 
    //-----2
   const transform2 = vehicle.wheelInfos[2].worldTransform
  
  const wheelBody2 = wheelBodies[2]
  wheelBody2.position.copy(transform2.position)
  wheelBody2.quaternion.copy(transform2.quaternion)
 
 tire3.position.copy(transform2.position)
 tire3.quaternion.copy(transform2.quaternion)
 
 
     //-----3
const transform3 = vehicle.wheelInfos[3].worldTransform
 
const wheelBody3 = wheelBodies[3]
wheelBody3.position.copy(transform3.position)
wheelBody3.quaternion.copy(transform3.quaternion)
 
tire4.position.copy(transform3.position)
tire4.quaternion.copy(transform3.quaternion)
 
 

 
 
 
 
 
 
 
  
 }

 
 
})
//______________________________

 





document.addEventListener('keydown', (event) => {
    const maxSteerVal = 0.5
           const maxForce = 300
           const brakeForce = 10
  
           switch (event.key) {
             case 'w':
             case 'ArrowUp':
               vehicle.applyEngineForce(-maxForce, 2)
               vehicle.applyEngineForce(-maxForce, 3)
               break
  
             case 's':
             case 'ArrowDown':
               vehicle.applyEngineForce(maxForce, 2)
               vehicle.applyEngineForce(maxForce, 3)
               break
  
             case 'a':
             case 'ArrowLeft':
               vehicle.setSteeringValue(maxSteerVal, 0)
               vehicle.setSteeringValue(maxSteerVal, 1)
               break
               case 'd':
                case 'ArrowRight':
                  vehicle.setSteeringValue(-maxSteerVal, 0)
                  vehicle.setSteeringValue(-maxSteerVal, 1)
                  break
    
                case 'b':
                  vehicle.setBrake(brakeForce, 0)
                  vehicle.setBrake(brakeForce, 1)
                  vehicle.setBrake(brakeForce, 2)
                  vehicle.setBrake(brakeForce, 3)
                  break
  
                  case 'r':
                    restartCurrentScene()
                    break
              }
            })
  
            // restartCurrentScene
  
    // Reset force on keyup
    document.addEventListener('keyup', (event) => {
      switch (event.key) {
        case 'w':
        case 'ArrowUp':
          vehicle.applyEngineForce(0, 2)
          vehicle.applyEngineForce(0, 3)
          break
  
        case 's':
        case 'ArrowDown':
          vehicle.applyEngineForce(0, 2)
          vehicle.applyEngineForce(0, 3)
          break
  
        case 'a':
        case 'ArrowLeft':
          vehicle.setSteeringValue(0, 0)
          vehicle.setSteeringValue(0, 1)
          break
          case 'd':
            case 'ArrowRight':
              vehicle.setSteeringValue(0, 0)
              vehicle.setSteeringValue(0, 1)
              break
  
            case 'b':
              vehicle.setBrake(0, 0)
              vehicle.setBrake(0, 1)
              vehicle.setBrake(0, 2)
              vehicle.setBrake(0, 3)
              break
  }
  })   
              
                    
  

















//_______carBody End.._______________________
//_________1





var geometry = new THREE.BoxGeometry(800, 200,800);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')

});
var j1 = new THREE.Mesh(geometry, material);
scene.add(j1);

const jamin1 = new CANNON.Box(new CANNON.Vec3(400, 100.3,400));
const J1 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-90,-130,-50)
})
J1.quaternion.setFromEuler(0, 0, 0);
J1.addShape(jamin1)
world.addBody(J1)

//_________2
var geometry = new THREE.BoxGeometry(39, 3, 39);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/Floors.jpg')

});
var j2 = new THREE.Mesh(geometry, material);
scene.add(j2);

const jamin2 = new CANNON.Box(new CANNON.Vec3(19.5, 1.7, 19.5));
const J2 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-290,-11,-117)
})
J2.quaternion.setFromEuler(0, 0.4, 0);
J2.addShape(jamin2)
world.addBody(J2)

/*

//_________3
var geometry = new THREE.BoxGeometry(40, 3, 40);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')

});
var j3 = new THREE.Mesh(geometry, material);
scene.add(j3);

const jamin3 = new CANNON.Box(new CANNON.Vec3(20, 1.7, 20));
const J3 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(0, 0.9, -5)
})
J3.quaternion.setFromEuler(0, 0, 0);
J3.addShape(jamin3)
world.addBody(J3)





//_________4
var geometry = new THREE.BoxGeometry(20, 3, 20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg')

});
var j4 = new THREE.Mesh(geometry, material);
scene.add(j4);

const jamin4 = new CANNON.Box(new CANNON.Vec3(10, 1.7, 10));
const J4 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(8, 1.2, -0)
})
J4.quaternion.setFromEuler(0, 0, 0);
J4.addShape(jamin4)
world.addBody(J4)


//_________5
var geometry = new THREE.BoxGeometry(40, 3, 40);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/Floors.jpg')
  
});
var j5 = new THREE.Mesh(geometry, material);
scene.add(j5);

const jamin5 = new CANNON.Box(new CANNON.Vec3(20, 1.7, 20));
const J5 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-28, 0.2, -20)
})
J5.quaternion.setFromEuler(0, 0, 0);
J5.addShape(jamin5)
world.addBody(J5)


//_________6
var geometry = new THREE.BoxGeometry(21, 3, 21);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
  
});
var j6 = new THREE.Mesh(geometry, material);
scene.add(j6);

const jamin6 = new CANNON.Box(new CANNON.Vec3(10.5, 1.7, 10.5));
const J6 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(8, 1.1, 0)
})
J6.quaternion.setFromEuler(0, 0, 0);
J6.addShape(jamin6)
world.addBody(J6)

//___7
var geometry = new THREE.BoxGeometry(90, 3,90);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')

});
var j7 = new THREE.Mesh(geometry, material);
scene.add(j7);

const jamin7 = new CANNON.Box(new CANNON.Vec3(45, 1.7, 45));
const J7 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-20, 0.1, 20)
})
J7.quaternion.setFromEuler(0, 0, 0);
J7.addShape(jamin7)
world.addBody(J7)


//___8
var geometry = new THREE.BoxGeometry(40, 3, 40);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')

});
var j8 = new THREE.Mesh(geometry, material);
scene.add(j8);

const jamin8 = new CANNON.Box(new CANNON.Vec3(20, 1.7, 20));
const J8 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-0, 0.4, 80)
})
J8.quaternion.setFromEuler(0, 0, 0);
J8.addShape(jamin8)
world.addBody(J8)

//___9
var geometry = new THREE.BoxGeometry(40, 3, 40);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')

});
var j9 = new THREE.Mesh(geometry, material);
scene.add(j9);

const jamin9 = new CANNON.Box(new CANNON.Vec3(20, 1.7, 20));
const J9 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(40, 0.4, 80)
})
J9.quaternion.setFromEuler(0, 0, 0);
J9.addShape(jamin9)
world.addBody(J9)

//___10
var geometry = new THREE.BoxGeometry(40, 3, 40);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')

});
var j10 = new THREE.Mesh(geometry, material);
scene.add(j10);

const jamin10 = new CANNON.Box(new CANNON.Vec3(20, 1.7, 20));
const J10 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(23, 0.4, 30)
})
J10.quaternion.setFromEuler(0, 0, 0);
J10.addShape(jamin10)
world.addBody(J10)

//___11
var geometry = new THREE.BoxGeometry(40, 3, 40);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg')
});
var j11 = new THREE.Mesh(geometry, material);
scene.add(j11);

const jamin11 = new CANNON.Box(new CANNON.Vec3(20, 1.7, 20));
const J11 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(40, 0.2, 50)
})
J11.quaternion.setFromEuler(0, 0, 0);
J11.addShape(jamin11)
world.addBody(J11)


//___12
var geometry = new THREE.BoxGeometry(40, 3, 40);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg')
});
var j12 = new THREE.Mesh(geometry, material);
scene.add(j12);

const jamin12 = new CANNON.Box(new CANNON.Vec3(20, 1.7, 20));
const J12 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(40, 0.2, -10)
})
J12.quaternion.setFromEuler(0, 0, 0);
J12.addShape(jamin12)
world.addBody(J12)

//___13
var geometry = new THREE.BoxGeometry(40, 3, 40);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg')
});
var j13 = new THREE.Mesh(geometry, material);
scene.add(j13);

const jamin13 = new CANNON.Box(new CANNON.Vec3(20, 1.7, 20));
const J13 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(15, 0.4, -45)
})
J13.quaternion.setFromEuler(0, 0, 0);
J13.addShape(jamin13)
world.addBody(J13)


//___14
var geometry = new THREE.BoxGeometry(40, 3, 40);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/atlas.png')
});
var j14 = new THREE.Mesh(geometry, material);
scene.add(j14);

const jamin14 = new CANNON.Box(new CANNON.Vec3(20, 1.7, 20));
const J14 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-23, 0.6, -58)
})
J14.quaternion.setFromEuler(0, 0, 0);
J14.addShape(jamin14)
world.addBody(J14)

//___15
var geometry = new THREE.BoxGeometry(40, 3, 40);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/atlas.png')
});
var j15 = new THREE.Mesh(geometry, material);
scene.add(j15);

const jamin15 = new CANNON.Box(new CANNON.Vec3(20, 1.7, 20));
const J15 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-68, 0.6, -20)
})
J15.quaternion.setFromEuler(0, 0, 0);
J15.addShape(jamin15)
world.addBody(J15)


//___16
var geometry = new THREE.BoxGeometry(40, 3, 40);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')

});
var j16 = new THREE.Mesh(geometry, material);
scene.add(j16);

const jamin16 = new CANNON.Box(new CANNON.Vec3(20, 1.7, 20));
const J16 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(27,0.5, -46)
})
J16.quaternion.setFromEuler(0, 0, 0);
J16.addShape(jamin16)
world.addBody(J16)


//___17
var geometry = new THREE.BoxGeometry(50, 3,50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')

});
var j17 = new THREE.Mesh(geometry, material);
scene.add(j17);

const jamin17 = new CANNON.Box(new CANNON.Vec3(25, 1.7,25));
const J17 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(20,0.3, -10)
})
J17.quaternion.setFromEuler(0, 0, 0);
J17.addShape(jamin17)
world.addBody(J17)


//___18
var geometry = new THREE.BoxGeometry(22, 3, 35);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
 
});
var j18 = new THREE.Mesh(geometry, material);
scene.add(j18);

const jamin18 = new CANNON.Box(new CANNON.Vec3(11, 1.7,17.5));
const J18 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(68, 0.4, -4)
})
J18.quaternion.setFromEuler(0, 0, 0);
J18.addShape(jamin18)
world.addBody(J18)


//___19
var geometry = new THREE.BoxGeometry(22, 3, 35);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/atlas.png')
  
});
var j19 = new THREE.Mesh(geometry, material);
scene.add(j19);

const jamin19 = new CANNON.Box(new CANNON.Vec3(11, 1.7,17.5));
const J19 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(85, 0.2, -15)
})
J19.quaternion.setFromEuler(0, 0, 0);
J19.addShape(jamin19)
world.addBody(J19)

//___20
var geometry = new THREE.BoxGeometry(50, 3, 50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/atlas.png')
});
var j20 = new THREE.Mesh(geometry, material);
scene.add(j20);

const jamin20= new CANNON.Box(new CANNON.Vec3(25, 1.7,25));
const J20 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(85, 0.1, -30)
})
J20.quaternion.setFromEuler(0, 0, 0);
J20.addShape(jamin20)
world.addBody(J20)

*/



//___21
var geometry = new THREE.BoxGeometry(80, 3, 80);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg')
  
});
var j21 = new THREE.Mesh(geometry, material);
scene.add(j21);

const jamin21 = new CANNON.Box(new CANNON.Vec3(40, 1.7,40));
const J21 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(110,1, -70)
})
J21.quaternion.setFromEuler(0, 0, 0);
J21.addShape(jamin21)
world.addBody(J21)


//___22
var geometry = new THREE.BoxGeometry(200, 3, 200);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j22 = new THREE.Mesh(geometry, material);
scene.add(j22);

const jamin22 = new CANNON.Box(new CANNON.Vec3(100, 1.7,100));
const J22 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(150,0.3, -180)
})
J22.quaternion.setFromEuler(0, 0, 0);
J22.addShape(jamin22)
world.addBody(J22)


//___23
var geometry = new THREE.BoxGeometry(50, 3, 50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg')
  
});
var j23 = new THREE.Mesh(geometry, material);
scene.add(j23);

const jamin23 = new CANNON.Box(new CANNON.Vec3(25, 1.7,25));
const J23 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(90,0.5, -130)
})
J23.quaternion.setFromEuler(0, 0, 0);
J23.addShape(jamin23)
world.addBody(J23)


//___24
var geometry = new THREE.BoxGeometry(50, 3, 50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var j24 = new THREE.Mesh(geometry, material);
scene.add(j24);

const jamin24 = new CANNON.Box(new CANNON.Vec3(25, 1.7,25));
const J24 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(100,0.8, -118)
})
J24.quaternion.setFromEuler(0, 0, 0);
J24.addShape(jamin24)
world.addBody(J24)


//___25
var geometry = new THREE.BoxGeometry(20, 3,20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j25 = new THREE.Mesh(geometry, material);
scene.add(j25);

const jamin25 = new CANNON.Box(new CANNON.Vec3(10, 1.7,10));
const J25 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(90,1.7, -140)
})
J25.quaternion.setFromEuler(0.01,-0.4, 0);
J25.addShape(jamin25)
world.addBody(J25)


//___26
var geometry = new THREE.BoxGeometry(20, 3, 20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j26 = new THREE.Mesh(geometry, material);
scene.add(j26);

const jamin26 = new CANNON.Box(new CANNON.Vec3(10, 1.7, 10));
const J26 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(100,1, -148)
})
J26.quaternion.setFromEuler(0.01, -0, 0);
J26.addShape(jamin26)
world.addBody(J26)


//___27
var geometry = new THREE.BoxGeometry(20, 3, 20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j27 = new THREE.Mesh(geometry, material);
scene.add(j27);

const jamin27 = new CANNON.Box(new CANNON.Vec3(10, 1.7, 10));
const J27 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(79,0.7, -150)
})
J27.quaternion.setFromEuler(0.01, -0.2, 0);
J27.addShape(jamin27)
world.addBody(J27)


//___28
var geometry = new THREE.BoxGeometry(20, 3, 20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j28 = new THREE.Mesh(geometry, material);
scene.add(j28);

const jamin28 = new CANNON.Box(new CANNON.Vec3(10, 1.7, 10));
const J28 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(79, 0.7, -180)
})
J28.quaternion.setFromEuler(0.01, -0.2, 0);
J28.addShape(jamin28)
world.addBody(J28)


//___29
var geometry = new THREE.BoxGeometry(20, 3,20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j29 = new THREE.Mesh(geometry, material);
scene.add(j29);

const jamin29 = new CANNON.Box(new CANNON.Vec3(10, 1.7, 10));
const J29 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(96.2, 0.7, -178.3)
})
J29.quaternion.setFromEuler(0, -0, 0);
J29.addShape(jamin29)
world.addBody(J29)


//___30
var geometry = new THREE.BoxGeometry(20, 3,20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j30 = new THREE.Mesh(geometry, material);
scene.add(j30);

const jamin30 = new CANNON.Box(new CANNON.Vec3(10, 1.7, 10));
const J30 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(60.2, 0.7, -178.3)
})
J30.quaternion.setFromEuler(0, -1, 0);
J30.addShape(jamin30)
world.addBody(J30)

//___31
var geometry = new THREE.BoxGeometry(20, 3,20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j31 = new THREE.Mesh(geometry, material);
scene.add(j31);

const jamin31 = new CANNON.Box(new CANNON.Vec3(10, 1.7, 10));
const J31 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(46, 0.6, -160)
})
J31.quaternion.setFromEuler(0,-0.4, 0);
J31.addShape(jamin31)
world.addBody(J31)


//___32
var geometry = new THREE.BoxGeometry(30, 3,30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j32 = new THREE.Mesh(geometry, material);
scene.add(j32);

const jamin32 = new CANNON.Box(new CANNON.Vec3(15, 1.7, 15));
const J32 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(37.5, 0.7, -133)
})
J32.quaternion.setFromEuler(0,0, 0);
J32.addShape(jamin32)
world.addBody(J32)


//___33
var geometry = new THREE.BoxGeometry(30,10,30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j33 = new THREE.Mesh(geometry, material);
scene.add(j33);

const jamin33 = new CANNON.Box(new CANNON.Vec3(15, 5.7, 15));
const J33 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(70,0, -200)
})
J33.quaternion.setFromEuler(-0.4,0, 0);
J33.addShape(jamin33)
world.addBody(J33)

//___34
var geometry = new THREE.BoxGeometry(30,10,30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j34 = new THREE.Mesh(geometry, material);
scene.add(j34);

const jamin34 = new CANNON.Box(new CANNON.Vec3(15, 5.7, 15));
const J34 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(40,0, -180)
})
J34.quaternion.setFromEuler(-0.1,0.8, 0.1);
J34.addShape(jamin34)
world.addBody(J34)


//___35
var geometry = new THREE.BoxGeometry(30,10,30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j35 = new THREE.Mesh(geometry, material);
scene.add(j35);

const jamin35 = new CANNON.Box(new CANNON.Vec3(15, 5.7, 15));
const J35 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(30,0.1, -150)
})
J35.quaternion.setFromEuler(-0.1,0, 0);
J35.addShape(jamin35)
world.addBody(J35)


//___36
var geometry = new THREE.BoxGeometry(30,10,30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j36 = new THREE.Mesh(geometry, material);
scene.add(j36);

const jamin36 = new CANNON.Box(new CANNON.Vec3(15, 5.7, 15));
const J36 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(29,0.1, -125)
})
J36.quaternion.setFromEuler(0.1,0, 0);
J36.addShape(jamin36)
world.addBody(J36)


//___37
var geometry = new THREE.BoxGeometry(30, 3, 30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j37 = new THREE.Mesh(geometry, material);
scene.add(j37);

const jamin37 = new CANNON.Box(new CANNON.Vec3(15, 1.7, 15));
const J37 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(52,0.6, -124)
})
J37.quaternion.setFromEuler(0, 0, 0);
J37.addShape(jamin37);
world.addBody(J37);



//___38
var geometry = new THREE.BoxGeometry(30, 3, 30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j38 = new THREE.Mesh(geometry, material);
scene.add(j38);

const jamin38 = new CANNON.Box(new CANNON.Vec3(15, 1.7, 15));
const J38 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(130,0.5, -170)
})
J38.quaternion.setFromEuler(0, 0, 0);
J38.addShape(jamin38);
world.addBody(J38);


//___39
var geometry = new THREE.BoxGeometry(80, 3, 80);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/Floors.jpg')
});
var j39 = new THREE.Mesh(geometry, material);
scene.add(j39);

const jamin39 = new CANNON.Box(new CANNON.Vec3(40, 1.7,40));
const J39 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(100, 0.4, -220)
})
J39.quaternion.setFromEuler(0, 0, 0);
J39.addShape(jamin39);
world.addBody(J39);



//___40
var geometry = new THREE.BoxGeometry(5, 3,5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg')
  
});
var j40 = new THREE.Mesh(geometry, material);
scene.add(j40);

const jamin40 = new CANNON.Box(new CANNON.Vec3(2.5, 1.7,2.5));
const J40 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(87, 0.6, -210)
})
J40.quaternion.setFromEuler(0, 0, 0);
J40.addShape(jamin40);
world.addBody(J40);


//___41
var geometry = new THREE.BoxGeometry(15, 3,25);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg')

});
var j41 = new THREE.Mesh(geometry, material);
scene.add(j41);
const jamin41 = new CANNON.Box(new CANNON.Vec3(7.5, 1.7,12.5));
const J41 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(122, 0.6, -205)
})
J41.quaternion.setFromEuler(0, 0, 0);
J41.addShape(jamin41);
world.addBody(J41);


//___42
var geometry = new THREE.BoxGeometry(10, 3,5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg')
});
var j42 = new THREE.Mesh(geometry, material);
scene.add(j42);

const jamin42 = new CANNON.Box(new CANNON.Vec3(5, 1.7,2.5));
const J42 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(101, 0.6, -210)
})
J42.quaternion.setFromEuler(0, 0, 0);
J42.addShape(jamin42);
world.addBody(J42);

//pathar

//___43
var geometry = new THREE.BoxGeometry(30,20,30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j43= new THREE.Mesh(geometry, material);
scene.add(j43);

const jamin43 = new CANNON.Box(new CANNON.Vec3(15, 10.3,15));
const J43 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(160,-3, -243)
})
J43.quaternion.setFromEuler(0.2,0.4, 0);
J43.addShape(jamin43);
world.addBody(J43);


//___44
var geometry = new THREE.BoxGeometry(30, 20, 30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j44 = new THREE.Mesh(geometry, material);
scene.add(j44);

const jamin44 = new CANNON.Box(new CANNON.Vec3(15, 10.3, 15));
const J44 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(160,-2, -210)
})
J44.quaternion.setFromEuler(0.1, -0, 0);
J44.addShape(jamin44);
world.addBody(J44);


//___45
var geometry = new THREE.BoxGeometry(30, 20, 30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j45 = new THREE.Mesh(geometry, material);
scene.add(j45);

const jamin45 = new CANNON.Box(new CANNON.Vec3(15, 10.3, 15));
const J45 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(140,-2, -280)
})
J45.quaternion.setFromEuler(-0.1,-0.2, 0.2);
J45.addShape(jamin45);
world.addBody(J45);



//___46
var geometry = new THREE.BoxGeometry(30, 20, 30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j46 = new THREE.Mesh(geometry, material);
scene.add(j46);

const jamin46 = new CANNON.Box(new CANNON.Vec3(15, 10.3, 15));
const J46 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(120,-3, -290)
})
J46.quaternion.setFromEuler(0.2,-0.2,-0.2);
J46.addShape(jamin46);
world.addBody(J46);

//___47
var geometry = new THREE.BoxGeometry(30, 20, 30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j47 = new THREE.Mesh(geometry, material);
scene.add(j47);

const jamin47 = new CANNON.Box(new CANNON.Vec3(15, 10.3, 15));
const J47 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(100,3, -290)
})
J47.quaternion.setFromEuler(0,0,0);
J47.addShape(jamin47);
world.addBody(J47);

//___48
var geometry = new THREE.BoxGeometry(30, 20, 30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j48 = new THREE.Mesh(geometry, material);
scene.add(j48);

const jamin48 = new CANNON.Box(new CANNON.Vec3(15, 10.3, 15));
const J48 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(80,-3, -290)
})
J48.quaternion.setFromEuler(-0.3,0.2,0);
J48.addShape(jamin48);
world.addBody(J48);


//___49
var geometry = new THREE.BoxGeometry(30, 20, 30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j49 = new THREE.Mesh(geometry, material);
scene.add(j49);

const jamin49 = new CANNON.Box(new CANNON.Vec3(15, 10.3, 15));
const J49 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(50,-3, -280)
})
J49.quaternion.setFromEuler(0.3,0.6,0);
J49.addShape(jamin49);
world.addBody(J49);


//___50
var geometry = new THREE.BoxGeometry(30, 20, 30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j50 = new THREE.Mesh(geometry, material);
scene.add(j50);

const jamin50 = new CANNON.Box(new CANNON.Vec3(15, 10.3, 15));
const J50 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(40,-3, -260)
})
J50.quaternion.setFromEuler(0.3,0.1,0);
J50.addShape(jamin50);
world.addBody(J50);

//___51
var geometry = new THREE.BoxGeometry(30, 20, 30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j51 = new THREE.Mesh(geometry, material);
scene.add(j51);

const jamin51 = new CANNON.Box(new CANNON.Vec3(15, 10.3, 15));
const J51 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(40,-3, -230)
})
J51.quaternion.setFromEuler(-0.1,0.1,0);
J51.addShape(jamin51);
world.addBody(J51);


//___52
var geometry = new THREE.BoxGeometry(30, 20, 30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j52 = new THREE.Mesh(geometry, material);
scene.add(j52);

const jamin52 = new CANNON.Box(new CANNON.Vec3(15, 10.3, 15));
const J52 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(40,-3, -210)
})
J52.quaternion.setFromEuler(-0.1,0.5,0);
J52.addShape(jamin52);
world.addBody(J52);


//___53
var geometry = new THREE.BoxGeometry(10,2,10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j53 = new THREE.Mesh(geometry, material);
scene.add(j53);

const jamin53 = new CANNON.Box(new CANNON.Vec3(5,1,5));
const J53 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(97,2.4, -30)
})
J53.quaternion.setFromEuler(0,0.8,0);
J53.addShape(jamin53);
world.addBody(J53);


//___54
var geometry = new THREE.BoxGeometry(10,2,10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j54 = new THREE.Mesh(geometry, material);
scene.add(j54);

const jamin54 = new CANNON.Box(new CANNON.Vec3(5,1,5));
const J54 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(110,2.4, -30)
})
J54.quaternion.setFromEuler(0,0.8,0);
J54.addShape(jamin54);
world.addBody(J54);


//___55
var geometry = new THREE.BoxGeometry(30,15,30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j55 = new THREE.Mesh(geometry, material);
scene.add(j55);

const jamin55 = new CANNON.Box(new CANNON.Vec3(15,7.7,15));
const J55 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(80,-5, -10)
})
J55.quaternion.setFromEuler(0.1,0,0);
J55.addShape(jamin55);
world.addBody(J55);


//___56
var geometry = new THREE.BoxGeometry(30,15,10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j56 = new THREE.Mesh(geometry, material);
scene.add(j56);

const jamin56 = new CANNON.Box(new CANNON.Vec3(15,7.7,5));
const J56 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(130,-5.4, -29)
})
J56.quaternion.setFromEuler(0.5,0,0);
J56.addShape(jamin56);
world.addBody(J56);


//___57
var geometry = new THREE.BoxGeometry(30,15,30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j57 = new THREE.Mesh(geometry, material);
scene.add(j57);

const jamin57 = new CANNON.Box(new CANNON.Vec3(15,7.7,15));
const J57 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(138,-5.5, -42)
})
J57.quaternion.setFromEuler(0,0,0.1);
J57.addShape(jamin57);
world.addBody(J57);


//___58
var geometry = new THREE.BoxGeometry(30,15,30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j58 = new THREE.Mesh(geometry, material);
scene.add(j58);

const jamin58 = new CANNON.Box(new CANNON.Vec3(15,7.7,15));
const J58 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(137.6,-5.5, -70)
})
J58.quaternion.setFromEuler(0,0,0.1);
J58.addShape(jamin58);
world.addBody(J58);


//___59
var geometry = new THREE.BoxGeometry(30,15,30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j59 = new THREE.Mesh(geometry, material);
scene.add(j59);

const jamin59 = new CANNON.Box(new CANNON.Vec3(15,7.7,15));
const J59 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(137.7,-5.5, -100)
})
J59.quaternion.setFromEuler(0,0,0.1);
J59.addShape(jamin59);
world.addBody(J59);


//___60
var geometry = new THREE.BoxGeometry(30,15,30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j60 = new THREE.Mesh(geometry, material);
scene.add(j60);

const jamin60 = new CANNON.Box(new CANNON.Vec3(15,7.7,15));
const J60 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(137.7,-5.5, -150)
})
J60.quaternion.setFromEuler(0,0,0.1);
J60.addShape(jamin60);
world.addBody(J60);

//___61
var geometry = new THREE.BoxGeometry(30,15,30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j61 = new THREE.Mesh(geometry, material);
scene.add(j61);

const jamin61 = new CANNON.Box(new CANNON.Vec3(15,7.7,15));
const J61 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(160.7,-5.5, -180)
})
J61.quaternion.setFromEuler(0,0,-0.1);
J61.addShape(jamin61);
world.addBody(J61);


//___62
var geometry = new THREE.BoxGeometry(51,15,51);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j62 = new THREE.Mesh(geometry, material);
scene.add(j62);

const jamin62 = new CANNON.Box(new CANNON.Vec3(25.5,7.7,25.5));
const J62 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(190.7,-5.5, -70)
})
J62.quaternion.setFromEuler(0,0,0);
J62.addShape(jamin62);
world.addBody(J62);

//___63
var geometry = new THREE.BoxGeometry(50, 15,50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg')
  
});
var j63 = new THREE.Mesh(geometry, material);
scene.add(j63);

const jamin63 = new CANNON.Box(new CANNON.Vec3(25, 7.7,25));
const J63 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(190.7, -5.4, -70)
})
J63.quaternion.setFromEuler(0,0, 0);
J63.addShape(jamin63);
world.addBody(J63);




//___64
var geometry = new THREE.BoxGeometry(25,15,25);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var j64 = new THREE.Mesh(geometry, material);
scene.add(j64);

const jamin64 = new CANNON.Box(new CANNON.Vec3(12.5,7.7,12.5));
const J64 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(200.7,-5.2, -60)
})
J64.quaternion.setFromEuler(0,0,0);
J64.addShape(jamin64);
world.addBody(J64);


//___65
var geometry = new THREE.BoxGeometry(24,15,24);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg')
  
});
var j65 = new THREE.Mesh(geometry, material);
scene.add(j65);

const jamin65 = new CANNON.Box(new CANNON.Vec3(12,7.7,12));
const J65 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(200.7,-5.1, -60)
})
J65.quaternion.setFromEuler(0,0,0);
J65.addShape(jamin65);
world.addBody(J65);

//___66
var geometry = new THREE.BoxGeometry(201, 3, 201);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j66= new THREE.Mesh(geometry, material);
scene.add(j66);

const jamin66 = new CANNON.Box(new CANNON.Vec3(100.5, 1.7, 100.5));
const J66 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(150, 0.2, -180)
})
J66.quaternion.setFromEuler(0, 0, 0);
J66.addShape(jamin66)
world.addBody(J66)

/*

//___67
var geometry = new THREE.BoxGeometry(20, 5,2);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j67 = new THREE.Mesh(geometry, material);
scene.add(j67);

const jamin67 = new CANNON.Box(new CANNON.Vec3(10, 2.7,1));
const J67 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-10.1, 0.8, 15)
})
J67.quaternion.setFromEuler(0, 0, 0);
J67.addShape(jamin67)
world.addBody(J67)


//___68
var geometry = new THREE.BoxGeometry(20, 5, 2);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j68 = new THREE.Mesh(geometry, material);
scene.add(j68);

const jamin68 = new CANNON.Box(new CANNON.Vec3(10, 2.7, 1));
const J68 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(9.9, 0.8, 15)
})
J68.quaternion.setFromEuler(0, 0, 0);
J68.addShape(jamin68)
world.addBody(J68)



//___69
var geometry = new THREE.BoxGeometry(2, 5, 20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j69 = new THREE.Mesh(geometry, material);
scene.add(j69);

const jamin69 = new CANNON.Box(new CANNON.Vec3(1, 2.7, 10));
const J69 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(21, 0.9,5)
})
J69.quaternion.setFromEuler(0, 0, 0);
J69.addShape(jamin69)
world.addBody(J69)




//___70
var geometry = new THREE.BoxGeometry(2, 5, 20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j70 = new THREE.Mesh(geometry, material);
scene.add(j70);

const jamin70 = new CANNON.Box(new CANNON.Vec3(1, 2.7, 10));
const J70 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(21, 0.9,-15)
})
J70.quaternion.setFromEuler(0, 0, 0);
J70.addShape(jamin70)
world.addBody(J70)


//___71
var geometry = new THREE.BoxGeometry(20, 5, 2);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j71 = new THREE.Mesh(geometry, material);
scene.add(j71);

const jamin71 = new CANNON.Box(new CANNON.Vec3(10, 2.7, 1));
const J71 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(12.1, 0.8, -25)
})
J71.quaternion.setFromEuler(0, 0, 0);
J71.addShape(jamin71)
world.addBody(J71)


//___72
var geometry = new THREE.BoxGeometry(20, 5,20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j72 = new THREE.Mesh(geometry, material);
scene.add(j72);

const jamin72 = new CANNON.Box(new CANNON.Vec3(10, 2.7,10));
const J72 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(20, 0.7, -35.2)
})
J72.quaternion.setFromEuler(0, 0, 0);
J72.addShape(jamin72)
world.addBody(J72)
*/

//___73
var geometry = new THREE.BoxGeometry(20, 5, 40);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j73 = new THREE.Mesh(geometry, material);
scene.add(j73);

const jamin73 = new CANNON.Box(new CANNON.Vec3(10, 2.7, 20));
const J73 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(55, 0.1, -22)
})
J73.quaternion.setFromEuler(0, 0, 0);
J73.addShape(jamin73)
world.addBody(J73)



//___74
var geometry = new THREE.BoxGeometry(20, 5, 40);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j74 = new THREE.Mesh(geometry, material);
scene.add(j74);

const jamin74 = new CANNON.Box(new CANNON.Vec3(10, 2.7, 20));
const J74 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(53, 0.2, 17)
})
J74.quaternion.setFromEuler(0, 0, 0);
J74.addShape(jamin74)
world.addBody(J74)



//___75
var geometry = new THREE.BoxGeometry(1, 5, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j75 = new THREE.Mesh(geometry, material);
scene.add(j75);

const jamin75 = new CANNON.Box(new CANNON.Vec3(0.5, 2.7,7.5));
const J75 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(45, 0.9, -35)
})
J75.quaternion.setFromEuler(0, 0, 0);
J75.addShape(jamin75)
world.addBody(J75)


//___76
var geometry = new THREE.BoxGeometry(1, 5, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j76 = new THREE.Mesh(geometry, material);
scene.add(j76);

const jamin76 = new CANNON.Box(new CANNON.Vec3(0.5, 2.7,7.5));
const J76 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(45, 0.9, -20)
})
J76.quaternion.setFromEuler(0, 0, 0);
J76.addShape(jamin76)
world.addBody(J76)


//___77
var geometry = new THREE.BoxGeometry(1, 5, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j77 = new THREE.Mesh(geometry, material);
scene.add(j77);

const jamin77 = new CANNON.Box(new CANNON.Vec3(0.5, 2.7,7.5));
const J77 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(44.9, 0.8,-10.5)
})
J77.quaternion.setFromEuler(0, 0, 0);
J77.addShape(jamin77)
world.addBody(J77)


//___78
var geometry = new THREE.BoxGeometry(1, 5, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j78 = new THREE.Mesh(geometry, material);
scene.add(j78);

const jamin78 = new CANNON.Box(new CANNON.Vec3(0.5, 2.7,7.5));
const J78 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(43.3, 0.8,4.4)
})
J78.quaternion.setFromEuler(0, 0, 0);
J78.addShape(jamin78)
world.addBody(J78)


//___79
var geometry = new THREE.BoxGeometry(1, 5, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j79 = new THREE.Mesh(geometry, material);
scene.add(j79);

const jamin79 = new CANNON.Box(new CANNON.Vec3(0.5, 2.7,7.5));
const J79 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(43.2, 0.7,19)
})
J79.quaternion.setFromEuler(0, 0, 0);
J79.addShape(jamin79)
world.addBody(J79)



//___80
var geometry = new THREE.BoxGeometry(1, 5, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j80 = new THREE.Mesh(geometry, material);
scene.add(j80);

const jamin80 = new CANNON.Box(new CANNON.Vec3(0.5, 2.7,7.5));
const J80 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(43.3, 0.8,30)
})
J80.quaternion.setFromEuler(0, 0, 0);
J80.addShape(jamin80)
world.addBody(J80)


//___81
var geometry = new THREE.BoxGeometry(13, 5, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  color:'lightgray'
});
var j81 = new THREE.Mesh(geometry, material);
scene.add(j81);

const jamin81 = new CANNON.Box(new CANNON.Vec3(6.5, 2.7,5));
const J81 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(50, -0.7,41.2)
})
J81.quaternion.setFromEuler(0.2, 0, 0);
J81.addShape(jamin81)
world.addBody(J81)


//___82
var geometry = new THREE.BoxGeometry(1, 5, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j82 = new THREE.Mesh(geometry, material);
scene.add(j82);

const jamin82 = new CANNON.Box(new CANNON.Vec3(0.5, 2.7,7.5));
const J82 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(43.2, 0.2,42.2)
})
J82.quaternion.setFromEuler(0.1, 0, 0);
J82.addShape(jamin82)
world.addBody(J82)


//___83
var geometry = new THREE.BoxGeometry(1, 5, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j83 = new THREE.Mesh(geometry, material);
scene.add(j83);

const jamin83 = new CANNON.Box(new CANNON.Vec3(0.5, 2.7,7.5));
const J83 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(60, 0.2,67.7)
})
J83.quaternion.setFromEuler(-0.1, 0, 0);
J83.addShape(jamin83)
world.addBody(J83)



//___84
var geometry = new THREE.BoxGeometry(1, 5, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j84 = new THREE.Mesh(geometry, material);
scene.add(j84);

const jamin84 = new CANNON.Box(new CANNON.Vec3(0.5, 2.7,7.5));
const J84 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(65, 0.2,67.7)
})
J84.quaternion.setFromEuler(-0.1, 0, 0);
J84.addShape(jamin84)
world.addBody(J84)


//___85
var geometry = new THREE.BoxGeometry(5, 5, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j85 = new THREE.Mesh(geometry, material);
scene.add(j85);

const jamin85 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7,7.5));
const J85 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(62.5,-0.2,67.7)
})
J85.quaternion.setFromEuler(-0.1, 0, 0);
J85.addShape(jamin85)
world.addBody(J85)


//___86
var geometry = new THREE.BoxGeometry(5, 5, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j86 = new THREE.Mesh(geometry, material);
scene.add(j86);

const jamin86 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7,7.5));
const J86 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(62.5,0.5,82.1)
})
J86.quaternion.setFromEuler(0, 0, 0);
J86.addShape(jamin86)
world.addBody(J86)


//___87
var geometry = new THREE.BoxGeometry(5, 5, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j87 = new THREE.Mesh(geometry, material);
scene.add(j87);

const jamin87 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7,7.5));
const J87 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(62.5,-0.2,96.5)
})
J87.quaternion.setFromEuler(0.1, 0, 0);
J87.addShape(jamin87)
world.addBody(J87)


//___88
var geometry = new THREE.BoxGeometry(1, 5, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j88 = new THREE.Mesh(geometry, material);
scene.add(j88);

const jamin88 = new CANNON.Box(new CANNON.Vec3(0.5, 2.7,7.5));
const J88 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(60,0,96.5)
})
J88.quaternion.setFromEuler(0.1, 0, 0);
J88.addShape(jamin88)
world.addBody(J88)


//___89
var geometry = new THREE.BoxGeometry(1, 5, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j89 = new THREE.Mesh(geometry, material);
scene.add(j89);

const jamin89 = new CANNON.Box(new CANNON.Vec3(0.5, 2.7,7.5));
const J89 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(65,0,96.5)
})
J89.quaternion.setFromEuler(0.1, 0, 0);
J89.addShape(jamin89)
world.addBody(J89)

//___90
var geometry = new THREE.BoxGeometry(1, 5, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j90 = new THREE.Mesh(geometry, material);
scene.add(j90);

const jamin90 = new CANNON.Box(new CANNON.Vec3(0.5, 2.7,7.5));
const J90 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(65.1,-0.7,110)
})
J90.quaternion.setFromEuler(0, 0, 0);
J90.addShape(jamin90)
world.addBody(J90)


//___91
var geometry = new THREE.BoxGeometry(15, 5, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j91 = new THREE.Mesh(geometry, material);
scene.add(j91);

const jamin91 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7,7.5));
const J91 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(57.6,-0.8,110)
})
J91.quaternion.setFromEuler(0, 0, 0);
J91.addShape(jamin91)
world.addBody(J91)


//___92
var geometry = new THREE.BoxGeometry(15, 5, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j92 = new THREE.Mesh(geometry, material);
scene.add(j92);

const jamin92 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8,2.5));
const J92 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(50,-0.7,110.2)
})
J92.quaternion.setFromEuler(0, 0, -0.1);
J92.addShape(jamin92)
world.addBody(J92)


//___93
var geometry = new THREE.BoxGeometry(11, 5, 1);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j93 = new THREE.Mesh(geometry, material);
scene.add(j93);

const jamin93 = new CANNON.Box(new CANNON.Vec3(5.5, 2.7,0.5));
const J93 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(55,-0.7,105.4)
})
J93.quaternion.setFromEuler(0,0.3, 0);
J93.addShape(jamin93)
world.addBody(J93)


//___94
var geometry = new THREE.BoxGeometry(15, 5, 7);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j94 = new THREE.Mesh(geometry, material);
scene.add(j94);

const jamin94 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7,3.5));
const J94 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(50,-0.8,110.2)
})
J94.quaternion.setFromEuler(0, 0, -0.1);
J94.addShape(jamin94)
world.addBody(J94)


//___95
var geometry = new THREE.BoxGeometry(15, 5, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j95 = new THREE.Mesh(geometry, material);
scene.add(j95);

const jamin95 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8,2.5));
const J95 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(35.6,0,110.2)
})
J95.quaternion.setFromEuler(0, 0, -0);
J95.addShape(jamin95)
world.addBody(J95)

//___96
var geometry = new THREE.BoxGeometry(15, 5, 7.1);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j96 = new THREE.Mesh(geometry, material);
scene.add(j96);

const jamin96 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8,3.55));
const J96 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(35.6,-0.1,110.2)
})
J96.quaternion.setFromEuler(0, 0, -0);
J96.addShape(jamin96)
world.addBody(J96)


//___97
var geometry = new THREE.BoxGeometry(15, 5, 7);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j97 = new THREE.Mesh(geometry, material);
scene.add(j97);

const jamin97 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8,3.55));
const J97 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(21,-0.2,110.2)
})
J97.quaternion.setFromEuler(0, 0, -0);
J97.addShape(jamin97)
world.addBody(J97)


//___98
var geometry = new THREE.BoxGeometry(15, 5, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j98 = new THREE.Mesh(geometry, material);
scene.add(j98);

const jamin98 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8, 2.5));
const J98 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(20.7, 0, 110.2)
})
J98.quaternion.setFromEuler(0, 0, -0);
J98.addShape(jamin98)
world.addBody(J98)


//___99
var geometry = new THREE.BoxGeometry(15, 5, 7.1);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j99 = new THREE.Mesh(geometry, material);
scene.add(j99);

const jamin99 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8,3.55));
const J99 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(6.6,-0.1,110.2)
})
J99.quaternion.setFromEuler(0, 0, -0);
J99.addShape(jamin99)
world.addBody(J99)


//___100
var geometry = new THREE.BoxGeometry(15, 5, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j100 = new THREE.Mesh(geometry, material);
scene.add(j100);

const jamin100 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8, 2.5));
const J100 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(6, 0, 110.2)
})
J100.quaternion.setFromEuler(0, 0, -0);
J100.addShape(jamin100)
world.addBody(J100)


//___101
var geometry = new THREE.BoxGeometry(15, 5, 7);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j101 = new THREE.Mesh(geometry, material);
scene.add(j101);

const jamin101 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8,3.55));
const J101 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-8.4,-0.1,110.2)
})
J101.quaternion.setFromEuler(0, 0, -0);
J101.addShape(jamin101)
world.addBody(J101)

//___102
var geometry = new THREE.BoxGeometry(15, 5, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j102 = new THREE.Mesh(geometry, material);
scene.add(j102);

const jamin102 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8, 2.5));
const J102 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-9, 0, 110.2)
})
J102.quaternion.setFromEuler(0, 0, -0);
J102.addShape(jamin102)
world.addBody(J102)



//___103
var geometry = new THREE.BoxGeometry(15, 5, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j103 = new THREE.Mesh(geometry, material);
scene.add(j103);

const jamin103 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8, 2.5));
const J103 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-24, 0, 110.2)
})
J103.quaternion.setFromEuler(0, 0, -0);
J103.addShape(jamin103)
world.addBody(J103)


//___104
var geometry = new THREE.BoxGeometry(15, 5, 7);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j104 = new THREE.Mesh(geometry, material);
scene.add(j104);

const jamin104 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8,3.55));
const J104 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-23.4,-0.1,110.2)
})
J104.quaternion.setFromEuler(0, 0, -0);
J104.addShape(jamin104)
world.addBody(J104)


//___105
var geometry = new THREE.BoxGeometry(15, 5, 7);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j105 = new THREE.Mesh(geometry, material);
scene.add(j105);

const jamin105 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8,3.55));
const J105 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-37,-0.02,112.1)
})
J105.quaternion.setFromEuler(0,0.3,0);
J105.addShape(jamin105)
world.addBody(J105)



//___106
var geometry = new THREE.BoxGeometry(15, 5.1, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j106 = new THREE.Mesh(geometry, material);
scene.add(j106);

const jamin106 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8, 2.5));
const J106 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-36.8,-0.01,112.5)
})
J106.quaternion.setFromEuler(0, 0.3, -0);
J106.addShape(jamin106)
world.addBody(J106)

//___107
var geometry = new THREE.BoxGeometry(15, 5, 7);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j107 = new THREE.Mesh(geometry, material);
scene.add(j107);

const jamin107 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8,3.55));
const J107 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-50,-0.01,117.5)
})
J107.quaternion.setFromEuler(0,0.5,0);
J107.addShape(jamin107)
world.addBody(J107)

//___108
var geometry = new THREE.BoxGeometry(15, 5, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j108 = new THREE.Mesh(geometry, material);
scene.add(j108);

const jamin108 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8, 2.5));
const J108 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-50,-0,118.1)
})
J108.quaternion.setFromEuler(0, 0.5, -0);
J108.addShape(jamin108)
world.addBody(J108)


//___109
var geometry = new THREE.BoxGeometry(15, 5, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j109 = new THREE.Mesh(geometry, material);
scene.add(j109);

const jamin109 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8, 2.5));
const J109 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-63,-0.01,125.2)
})
J109.quaternion.setFromEuler(0, 0.5, -0);
J109.addShape(jamin109)
world.addBody(J109)


//___110
var geometry = new THREE.BoxGeometry(15, 5, 7);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j110 = new THREE.Mesh(geometry, material);
scene.add(j110);

const jamin110 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8, 3.55));
const J110 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-63,-0.02,124.7)
})
J110.quaternion.setFromEuler(0, 0.5, 0);
J110.addShape(jamin110)
world.addBody(J110)


//___111
var geometry = new THREE.BoxGeometry(15, 5, 7);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j111 = new THREE.Mesh(geometry, material);
scene.add(j111);

const jamin111 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8, 3.55));
const J111 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-76,-0.01,130.3)
})
J111.quaternion.setFromEuler(0, 0.3, 0);
J111.addShape(jamin111)
world.addBody(J111)

//___112
var geometry = new THREE.BoxGeometry(15, 5, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j112 = new THREE.Mesh(geometry, material);
scene.add(j112);

const jamin112 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8, 2.5));
const J112 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-75.9, -0, 130.6)
})
J112.quaternion.setFromEuler(0, 0.3, -0);
J112.addShape(jamin112)
world.addBody(J112)


//___113
var geometry = new THREE.BoxGeometry(15, 5, 7);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j113 = new THREE.Mesh(geometry, material);
scene.add(j113);

const jamin113 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8, 3.55));
const J113 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-89.8,-0.02,133.8)
})
J113.quaternion.setFromEuler(0, 0.2, 0);
J113.addShape(jamin113)
world.addBody(J113)

//___114
var geometry = new THREE.BoxGeometry(15, 5, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j114 = new THREE.Mesh(geometry, material);
scene.add(j114);

const jamin114 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8, 2.5));
const J114 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-89.8,-0.01,134.2)
})
J114.quaternion.setFromEuler(0, 0.2, -0);
J114.addShape(jamin114)
world.addBody(J114)

//___115
var geometry = new THREE.BoxGeometry(15, 5, 7);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j115 = new THREE.Mesh(geometry, material);
scene.add(j115);

const jamin115 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8, 3.55));
const J115 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-104, -0.01, 136)
})
J115.quaternion.setFromEuler(0, 0.1, 0);
J115.addShape(jamin115)
world.addBody(J115)


//___116
var geometry = new THREE.BoxGeometry(15, 5, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j116 = new THREE.Mesh(geometry, material);
scene.add(j116);

const jamin116 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8, 2.5));
const J116 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-104, -0, 136)
})
J116.quaternion.setFromEuler(0, 0.1, -0);
J116.addShape(jamin116)
world.addBody(J116)


//___117
var geometry = new THREE.BoxGeometry(15, 5, 7);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j117 = new THREE.Mesh(geometry, material);
scene.add(j117);

const jamin117 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8, 3.55));
const J117 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-118, -0, 136.7)
})
J117.quaternion.setFromEuler(0, 0, 0);
J117.addShape(jamin117)
world.addBody(J117)

//___118
var geometry = new THREE.BoxGeometry(15, 5, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j118 = new THREE.Mesh(geometry, material);
scene.add(j118);

const jamin118 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8, 2.5));
const J118 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-118, 0.01, 136.7)
})
J118.quaternion.setFromEuler(0, 0, -0);
J118.addShape(jamin118)
world.addBody(J118)

//___119
var geometry = new THREE.BoxGeometry(15, 5, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j119 = new THREE.Mesh(geometry, material);
scene.add(j119);

const jamin119 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8, 2.5));
const J119 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-128, 0, 136.7)
})
J119.quaternion.setFromEuler(0, 0, -0);
J119.addShape(jamin119)
world.addBody(J119)

//___120
var geometry = new THREE.BoxGeometry(15, 5, 7);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j120 = new THREE.Mesh(geometry, material);
scene.add(j120);

const jamin120 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8, 3.55));
const J120 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-142, -0.01, 136.7)
})
J120.quaternion.setFromEuler(0, 0, 0);
J120.addShape(jamin120)
world.addBody(J120)


//___121
var geometry = new THREE.BoxGeometry(15, 5, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j121 = new THREE.Mesh(geometry, material);
scene.add(j121);

const jamin121 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8, 2.5));
const J121 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-142, 0.01, 136.7)
})
J121.quaternion.setFromEuler(0, 0, -0);
J121.addShape(jamin121)
world.addBody(J121)


//___122
var geometry = new THREE.BoxGeometry(15, 5, 7);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j122 = new THREE.Mesh(geometry, material);
scene.add(j122);

const jamin122 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8, 3.55));
const J122 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-155.3, -0, 136)
})
J122.quaternion.setFromEuler(0,-0.1, 0);
J122.addShape(jamin122)
world.addBody(J122)

//___123
var geometry = new THREE.BoxGeometry(15, 5, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j123 = new THREE.Mesh(geometry, material);
scene.add(j123);

const jamin123 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8, 2.5));
const J123 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-155.3,0.02, 136)
})
J123.quaternion.setFromEuler(0,-0.1, -0);
J123.addShape(jamin123)
world.addBody(J123)


//___124
var geometry = new THREE.BoxGeometry(15, 5, 7);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j124 = new THREE.Mesh(geometry, material);
scene.add(j124);

const jamin124 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8, 3.55));
const J124 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-169.5, -0.7, 134.6)
})
J124.quaternion.setFromEuler(0,-0.1, 0.1);
J124.addShape(jamin124)
world.addBody(J124)


//___125
var geometry = new THREE.BoxGeometry(15, 5.1, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j125 = new THREE.Mesh(geometry, material);
scene.add(j125);

const jamin125 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8, 2.5));
const J125 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-169.4, -0.7, 134.6)
})
J125.quaternion.setFromEuler(0,-0.1,0.1);
J125.addShape(jamin125)
world.addBody(J125)



//___126
var geometry = new THREE.BoxGeometry(15, 5,15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j126 = new THREE.Mesh(geometry, material);
scene.add(j126);

const jamin126 = new CANNON.Box(new CANNON.Vec3(7.5, 2.8,7.5));
const J126 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-178, -0.7, 134.6)
})
J126.quaternion.setFromEuler(0,0, 0);
J126.addShape(jamin126)
world.addBody(J126)

//___127
var geometry = new THREE.BoxGeometry(7, 5, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j127 = new THREE.Mesh(geometry, material);
scene.add(j127);

const jamin127 = new CANNON.Box(new CANNON.Vec3(3.55, 2.8,7.5));
const J127 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-183.5, -0.8, 122)
})
J127.quaternion.setFromEuler(0,0.3, 0);
J127.addShape(jamin127)
world.addBody(J127)


//___128
var geometry = new THREE.BoxGeometry(7, 5.1, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j128 = new THREE.Mesh(geometry, material);
scene.add(j128);

const jamin128 = new CANNON.Box(new CANNON.Vec3(3.55, 2.8,7.5));
const J128 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-185.4, -0.8, 109)
})
J128.quaternion.setFromEuler(0,0, 0);
J128.addShape(jamin128)
world.addBody(J128)


//___129
var geometry = new THREE.BoxGeometry(5, 5.1, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j129 = new THREE.Mesh(geometry, material);
scene.add(j129);

const jamin129 = new CANNON.Box(new CANNON.Vec3(2.5, 2.8,7.5));
const J129 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-183.3, -0.8, 122)
})
J129.quaternion.setFromEuler(0,0.4,0);
J129.addShape(jamin129)
world.addBody(J129)


//___130
var geometry = new THREE.BoxGeometry(5, 5.2, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j130 = new THREE.Mesh(geometry, material);
scene.add(j130);

const jamin130 = new CANNON.Box(new CANNON.Vec3(2.5, 2.8,7.5));
const J130 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-185.4, -0.8, 109)
})
J130.quaternion.setFromEuler(0,0,0);
J130.addShape(jamin130)
world.addBody(J130)

//____

//___131
var geometry = new THREE.BoxGeometry(7, 5, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j131 = new THREE.Mesh(geometry, material);
scene.add(j131);

const jamin131 = new CANNON.Box(new CANNON.Vec3(3.55, 2.8,7.5));
const J131 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-185.4, -0.8, 95)
})
J131.quaternion.setFromEuler(0,0, 0);
J131.addShape(jamin131)
world.addBody(J131)

//___132
var geometry = new THREE.BoxGeometry(7, 5.1, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j132 = new THREE.Mesh(geometry, material);
scene.add(j132);

const jamin132 = new CANNON.Box(new CANNON.Vec3(3.55, 2.8,7.5));
const J132 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-185.4, -0.8, 80)
})
J132.quaternion.setFromEuler(0,0, 0);
J132.addShape(jamin132)
world.addBody(J132)


//___133
var geometry = new THREE.BoxGeometry(7, 5, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j133 = new THREE.Mesh(geometry, material);
scene.add(j133);

const jamin133 = new CANNON.Box(new CANNON.Vec3(3.55, 2.8,7.5));
const J133 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-185.4, -0.8, 65)
})
J133.quaternion.setFromEuler(0,0, 0);
J133.addShape(jamin133)
world.addBody(J133)



//____
//___134
var geometry = new THREE.BoxGeometry(5, 5.1, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j134 = new THREE.Mesh(geometry, material);
scene.add(j134);

const jamin134 = new CANNON.Box(new CANNON.Vec3(2.5, 2.8,7.5));
const J134 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-185.4, -0.8, 95)
})
J134.quaternion.setFromEuler(0,0,0);
J134.addShape(jamin134)
world.addBody(J134)


//___135
var geometry = new THREE.BoxGeometry(5, 5.2, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j135 = new THREE.Mesh(geometry, material);
scene.add(j135);

const jamin135 = new CANNON.Box(new CANNON.Vec3(2.5, 2.8,7.5));
const J135 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-185.4, -0.8,80)
})
J135.quaternion.setFromEuler(0,0,0);
J135.addShape(jamin135)
world.addBody(J135)


//___136
var geometry = new THREE.BoxGeometry(5, 5.2, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j136 = new THREE.Mesh(geometry, material);
scene.add(j136);

const jamin136 = new CANNON.Box(new CANNON.Vec3(2.5, 2.8, 7.5));
const J136 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-185.4, -0.8,65)
})
J136.quaternion.setFromEuler(0, 0, 0);
J136.addShape(jamin136)
world.addBody(J136)






//____

//___137
var geometry = new THREE.BoxGeometry(7, 5.1, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j137 = new THREE.Mesh(geometry, material);
scene.add(j137);

const jamin137 = new CANNON.Box(new CANNON.Vec3(3.55, 2.8,7.5));
const J137 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-185.4, -0.8, 51)
})
J137.quaternion.setFromEuler(0,0, 0);
J137.addShape(jamin137)
world.addBody(J137)

//___138
var geometry = new THREE.BoxGeometry(7, 5, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j138 = new THREE.Mesh(geometry, material);
scene.add(j138);

const jamin138 = new CANNON.Box(new CANNON.Vec3(3.55, 2.8,7.5));
const J138 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-185.4, -0.8, 37)
})
J138.quaternion.setFromEuler(0,0, 0);
J138.addShape(jamin138)
world.addBody(J138)


//___139
var geometry = new THREE.BoxGeometry(7, 5.01, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j139 = new THREE.Mesh(geometry, material);
scene.add(j139);

const jamin139 = new CANNON.Box(new CANNON.Vec3(3.55, 2.8,7.5));
const J139 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-185.4, -0.8, 23)
})
J139.quaternion.setFromEuler(0,0, 0);
J139.addShape(jamin139)
world.addBody(J139)



//___

//___140
var geometry = new THREE.BoxGeometry(5, 5.2, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j140 = new THREE.Mesh(geometry, material);
scene.add(j140);

const jamin140 = new CANNON.Box(new CANNON.Vec3(2.5, 2.8, 7.5));
const J140 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-185.4, -0.8,50)
})
J140.quaternion.setFromEuler(0, 0, 0);
J140.addShape(jamin140)
world.addBody(J140)


//___141
var geometry = new THREE.BoxGeometry(5, 5.2, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j141 = new THREE.Mesh(geometry, material);
scene.add(j141);

const jamin141 = new CANNON.Box(new CANNON.Vec3(2.5, 2.8, 7.5));
const J141 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-185.4, -0.8,35)
})
J141.quaternion.setFromEuler(0, 0, 0);
J141.addShape(jamin141)
world.addBody(J141)


//___142
var geometry = new THREE.BoxGeometry(5, 5.1, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j142 = new THREE.Mesh(geometry, material);
scene.add(j142);

const jamin142 = new CANNON.Box(new CANNON.Vec3(2.5, 2.8, 7.5));
const J142 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-185.4, -0.8,23)
})
J142.quaternion.setFromEuler(0, 0, 0);
J142.addShape(jamin142)
world.addBody(J142)

//____
//___143
var geometry = new THREE.BoxGeometry(7, 5.01, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j143 = new THREE.Mesh(geometry, material);
scene.add(j143);

const jamin143 = new CANNON.Box(new CANNON.Vec3(3.55, 2.8,7.5));
const J143 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-185.4, -0.8, 23)
})
J143.quaternion.setFromEuler(0.1,-0.2, 0);
J143.addShape(jamin143)
world.addBody(J143)

//___144
var geometry = new THREE.BoxGeometry(7, 5.01, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j144 = new THREE.Mesh(geometry, material);
scene.add(j144);

const jamin144 = new CANNON.Box(new CANNON.Vec3(3.55, 2.8,7.5));
const J144 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-182.7, 0.5, 10)
})
J144.quaternion.setFromEuler(0.1,-0.2, 0);
J144.addShape(jamin144)
world.addBody(J144)


//___145
var geometry = new THREE.BoxGeometry(7, 5.1, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j145 = new THREE.Mesh(geometry, material);
scene.add(j145);

const jamin145 = new CANNON.Box(new CANNON.Vec3(3.55, 2.9,7.5));
const J145 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-178, 1.2, -3)
})
J145.quaternion.setFromEuler(0.01,-0.5, -0);
J145.addShape(jamin145)
world.addBody(J145)


//___146
var geometry = new THREE.BoxGeometry(7, 5.1, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j146 = new THREE.Mesh(geometry, material);
scene.add(j146);

const jamin146 = new CANNON.Box(new CANNON.Vec3(3.55, 2.9,7.5));
const J146 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-172, 1.2, -13)
})
J146.quaternion.setFromEuler(-0.01,-0.6, -0);
J146.addShape(jamin146)
world.addBody(J146)


//___147
var geometry = new THREE.BoxGeometry(7, 5.1, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j147 = new THREE.Mesh(geometry, material);
scene.add(j147);

const jamin147 = new CANNON.Box(new CANNON.Vec3(3.55, 2.9,7.5));
const J147 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-163.9, 1.1, -25)
})
J147.quaternion.setFromEuler(-0.01,-0.6, -0);
J147.addShape(jamin147)
world.addBody(J147)

//___148
var geometry = new THREE.BoxGeometry(7, 5.1, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j148 = new THREE.Mesh(geometry, material);
scene.add(j148);

const jamin148 = new CANNON.Box(new CANNON.Vec3(3.55, 2.9,7.5));
const J148 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-156,-0.1, -36.5)
})
J148.quaternion.setFromEuler(-0.2,-0.6,-0.1);
J148.addShape(jamin148)
world.addBody(J148)
//__________________


//___149
var geometry = new THREE.BoxGeometry(5, 5.2, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j149 = new THREE.Mesh(geometry, material);
scene.add(j149);

const jamin149 = new CANNON.Box(new CANNON.Vec3(2.5, 2.8, 7.5));
const J149 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-185.4, -0.8, 23)
})
J149.quaternion.setFromEuler(0.1, -0.2, 0);
J149.addShape(jamin149)
world.addBody(J149)

//___150
var geometry = new THREE.BoxGeometry(5, 5.2, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),

});
var j150 = new THREE.Mesh(geometry, material);
scene.add(j150);

const jamin150 = new CANNON.Box(new CANNON.Vec3(2.5, 2.8, 7.5));
const J150 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-182.7, 0.5, 10)
})
J150.quaternion.setFromEuler(0.1, -0.2, 0);
J150.addShape(jamin150)
world.addBody(J150)


//___151
var geometry = new THREE.BoxGeometry(5, 5.2, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j151 = new THREE.Mesh(geometry, material);
scene.add(j151);

const jamin151 = new CANNON.Box(new CANNON.Vec3(2.5, 2.8, 7.5));
const J151 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-178, 1.2, -3)
})
J151.quaternion.setFromEuler(0.01,-0.5, -0);
J151.addShape(jamin151)
world.addBody(J151)

//___152
var geometry = new THREE.BoxGeometry(5, 5.2, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j152 = new THREE.Mesh(geometry, material);
scene.add(j152);

const jamin152 = new CANNON.Box(new CANNON.Vec3(2.5, 2.8, 7.5));
const J152 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(120,-3, -290)
})
J152.quaternion.setFromEuler(0.2,-0.2,-0.2);
J152.addShape(jamin152)
world.addBody(J152)


//___153
var geometry = new THREE.BoxGeometry(5, 5.2, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j153 = new THREE.Mesh(geometry, material);
scene.add(j153);

const jamin153 = new CANNON.Box(new CANNON.Vec3(2.5, 2.8, 7.5));
const J153 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-172, 1.2, -13)
})
J153.quaternion.setFromEuler(-0.01,-0.6, -0);
J153.addShape(jamin153)
world.addBody(J153)


//___154
var geometry = new THREE.BoxGeometry(5, 5.2, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j154 = new THREE.Mesh(geometry, material);
scene.add(j154);

const jamin154 = new CANNON.Box(new CANNON.Vec3(2.5, 2.8, 7.5));
const J154 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-163.9, 1.1, -25)
})
J154.quaternion.setFromEuler(-0.01,-0.6, -0);
J154.addShape(jamin154)
world.addBody(J154)



//___155
var geometry = new THREE.BoxGeometry(5, 5.2, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j155 = new THREE.Mesh(geometry, material);
scene.add(j155);

const jamin155 = new CANNON.Box(new CANNON.Vec3(2.5, 2.8, 7.5));
const J155 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-156,-0.1, -36.5)
})
J155.quaternion.setFromEuler(-0.2,-0.6,-0.1);
J155.addShape(jamin155)
world.addBody(J155)

//___156
var geometry = new THREE.BoxGeometry(7, 5, 15.1);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j156 = new THREE.Mesh(geometry, material);
scene.add(j156);

const jamin156 = new CANNON.Box(new CANNON.Vec3(3.55, 2.7, 7.5));
const J156 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-150, -0.8, -45.1)
})
J156.quaternion.setFromEuler(0, -0.6, 0);
J156.addShape(jamin156)
world.addBody(J156)



//___157
var geometry = new THREE.BoxGeometry(5, 5.01, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j157 = new THREE.Mesh(geometry, material);
scene.add(j157);

const jamin157 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7, 7.5));
const J157 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-150, -0.8, -45.1)
})
J157.quaternion.setFromEuler(0, -0.6, 0);
J157.addShape(jamin157)
world.addBody(J157)


//___158
var geometry = new THREE.BoxGeometry(200, 5.1,150);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/atlas.png'),
  
});
var j158 = new THREE.Mesh(geometry, material);
scene.add(j158);

const jamin158 = new CANNON.Box(new CANNON.Vec3(100, 2.7, 75));const J158 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-50, -0.9, -120)
})
J158.quaternion.setFromEuler(0,0, 0);
J158.addShape(jamin158)
world.addBody(J158)


//___159
var geometry = new THREE.BoxGeometry(30,30, 30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),

});
var j159 = new THREE.Mesh(geometry, material);
scene.add(j159);

const jamin159 = new CANNON.Box(new CANNON.Vec3(15, 15, 15));
const J159 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-80, -11, -140)
})
J159.quaternion.setFromEuler(0.1, 0, 0);
J159.addShape(jamin159)
world.addBody(J159)



//___160
var geometry = new THREE.BoxGeometry(30, 30, 30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j160 = new THREE.Mesh(geometry, material);
scene.add(j160);

const jamin160 = new CANNON.Box(new CANNON.Vec3(15, 15, 15));
const J160 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-110, -11, -140)
})
J160.quaternion.setFromEuler(0.1, 0.3, 0.1);
J160.addShape(jamin160)
world.addBody(J160)


//___161
var geometry = new THREE.BoxGeometry(30, 30, 30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j161 = new THREE.Mesh(geometry, material);
scene.add(j161);

const jamin161 = new CANNON.Box(new CANNON.Vec3(15, 15, 15));
const J161 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-110, -11, -110)
})
J161.quaternion.setFromEuler(0, 0, 0.3);
J161.addShape(jamin161)
world.addBody(J161)


//___162
var geometry = new THREE.BoxGeometry(30, 30, 30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j162 = new THREE.Mesh(geometry, material);
scene.add(j162);

const jamin162 = new CANNON.Box(new CANNON.Vec3(15, 15, 15));
const J162 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-80, -11, -110)
})
J162.quaternion.setFromEuler(0,0.3,-0.1);
J162.addShape(jamin162)
world.addBody(J162)



//-------**--*start
//___163
var geometry = new THREE.BoxGeometry(5, 5.02, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j163 = new THREE.Mesh(geometry, material);
scene.add(j163);

const jamin163 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7, 7.5));
const J163 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-143, -0.8, -56.5)
})
J163.quaternion.setFromEuler(0, -0.5, 0);
J163.addShape(jamin163)
world.addBody(J163)


//___164
var geometry = new THREE.BoxGeometry(5, 5.01, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j164 = new THREE.Mesh(geometry, material);
scene.add(j164);

const jamin164 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7, 7.5));
const J164 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-138.4, -0.8, -69.2)
})
J164.quaternion.setFromEuler(0,-0.2, 0);
J164.addShape(jamin164)
world.addBody(J164)


//___165
var geometry = new THREE.BoxGeometry(5, 5.02, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j165 = new THREE.Mesh(geometry, material);
scene.add(j165);

const jamin165 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7, 7.5));
const J165 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-137, -0.8, -83)
})
J165.quaternion.setFromEuler(0,-0, 0);
J165.addShape(jamin165)
world.addBody(J165)




//___166
var geometry = new THREE.BoxGeometry(5, 5.01, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j166 = new THREE.Mesh(geometry, material);
scene.add(j166);

const jamin166 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7, 7.5));
const J166 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-137, -0.8, -97)
})
J166.quaternion.setFromEuler(0,-0, 0);
J166.addShape(jamin166)
world.addBody(J166)

//___167
var geometry = new THREE.BoxGeometry(5, 5.02, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j167 = new THREE.Mesh(geometry, material);
scene.add(j167);

const jamin167 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7, 7.5));
const J167 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-137, -0.8, -111)
})
J167.quaternion.setFromEuler(0,-0, 0);
J167.addShape(jamin167)
world.addBody(J167)



//___168
var geometry = new THREE.BoxGeometry(5, 5.01, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j168 = new THREE.Mesh(geometry, material);
scene.add(j168);

const jamin168 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7, 7.5));
const J168 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-137, -0.8, -125)
})
J168.quaternion.setFromEuler(0, -0, 0);
J168.addShape(jamin168)
world.addBody(J168)


//___169
var geometry = new THREE.BoxGeometry(5, 5.02, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j169 = new THREE.Mesh(geometry, material);
scene.add(j169);

const jamin169 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7, 7.5));
const J169 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-137, -0.8, -138)
})
J169.quaternion.setFromEuler(0, -0, 0);
J169.addShape(jamin169)
world.addBody(J169)



//___170
var geometry = new THREE.BoxGeometry(5, 5.01, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j170 = new THREE.Mesh(geometry, material);
scene.add(j170);

const jamin170 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7, 7.5));
const J170 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-137, -0.8, -148)
})
J170.quaternion.setFromEuler(0, -0, 0);
J170.addShape(jamin170)
world.addBody(J170)


//___171
var geometry = new THREE.BoxGeometry(5, 5.02, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j171 = new THREE.Mesh(geometry, material);
scene.add(j171);

const jamin171 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7, 7.5));
const J171 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-133.3, -0.8, -160)
})
J171.quaternion.setFromEuler(0, -0.6, 0);
J171.addShape(jamin171)
world.addBody(J171)

//___172
var geometry = new THREE.BoxGeometry(5, 5.01, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j172 = new THREE.Mesh(geometry, material);
scene.add(j172);

const jamin172 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7, 7.5));
const J172 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-123.7, -0.8, -169.3)
})
J172.quaternion.setFromEuler(0, -1, 0);
J172.addShape(jamin172)
world.addBody(J172)

//___173
var geometry = new THREE.BoxGeometry(5, 5.0, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j173 = new THREE.Mesh(geometry, material);
scene.add(j173);

const jamin173 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7, 7.5));
const J173 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-110, -0.8, -173)
})
J173.quaternion.setFromEuler(0, -1.6, 0);
J173.addShape(jamin173)
world.addBody(J173)



//___174
var geometry = new THREE.BoxGeometry(5, 5.01, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j174 = new THREE.Mesh(geometry, material);
scene.add(j174);

const jamin174 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7, 7.5));
const J174 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-95, -0.8, -172.6)
})
J174.quaternion.setFromEuler(0, -1.6, 0);
J174.addShape(jamin174)
world.addBody(J174)


//___175
var geometry = new THREE.BoxGeometry(5, 5.0, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j175 = new THREE.Mesh(geometry, material);
scene.add(j175);

const jamin175 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7, 7.5));
const J175 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-80, -0.8, -172.2)
})
J175.quaternion.setFromEuler(0, -1.6, 0);
J175.addShape(jamin175)
world.addBody(J175)

//___176
var geometry = new THREE.BoxGeometry(5, 5.01, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j176 = new THREE.Mesh(geometry, material);
scene.add(j176);

const jamin176 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7, 7.5));
const J176 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-66.06, -0.8, -169.7)
})
J176.quaternion.setFromEuler(0, -1.9, 0);
J176.addShape(jamin176)
world.addBody(J176)

//___177
var geometry = new THREE.BoxGeometry(5, 5.0, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j177 = new THREE.Mesh(geometry, material);
scene.add(j177);

const jamin177 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7, 7.5));
const J177 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-54.5, -0.8, -163)
})
J177.quaternion.setFromEuler(0, -2.3, 0);
J177.addShape(jamin177)
world.addBody(J177)



//___178
var geometry = new THREE.BoxGeometry(5, 5.01, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j178 = new THREE.Mesh(geometry, material);
scene.add(j178);

const jamin178 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7, 7.5));
const J178 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-44, -0.8, -153.6)
})
J178.quaternion.setFromEuler(0, -2.3, 0);
J178.addShape(jamin178)
world.addBody(J178)



//___179
var geometry = new THREE.BoxGeometry(5, 5.0, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j179 = new THREE.Mesh(geometry, material);
scene.add(j179);

const jamin179 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7, 7.5));
const J179 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-34.5, -0.8, -143.2)
})
J179.quaternion.setFromEuler(0, -2.5, 0);
J179.addShape(jamin179)
world.addBody(J179)



//___180
var geometry = new THREE.BoxGeometry(5, 5.01, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j180 = new THREE.Mesh(geometry, material);
scene.add(j180);

const jamin180 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7, 7.5));
const J180 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-26, -0.8, -131.8)
})
J180.quaternion.setFromEuler(0, -2.5, 0);
J180.addShape(jamin180)
world.addBody(J180)



//___181
var geometry = new THREE.BoxGeometry(5, 5.0, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j181 = new THREE.Mesh(geometry, material);
scene.add(j181);

const jamin181 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7, 7.5));
const J181 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-17.2, -0.8, -120)
})
J181.quaternion.setFromEuler(0, -2.5, 0);
J181.addShape(jamin181)
world.addBody(J181)



//___182
var geometry = new THREE.BoxGeometry(5, 5.01, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j182 = new THREE.Mesh(geometry, material);
scene.add(j182);

const jamin182 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7, 7.5));
const J182 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-10, -0.8, -109.9)
})
J182.quaternion.setFromEuler(0,0.6, 0);
J182.addShape(jamin182)
world.addBody(J182)


//___183
var geometry = new THREE.BoxGeometry(5, 5.0, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j183 = new THREE.Mesh(geometry, material);
scene.add(j183);

const jamin183 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7, 7.5));
const J183 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-2, -0.8, -98.2)
})
J183.quaternion.setFromEuler(0,0.6, 0);
J183.addShape(jamin183)
world.addBody(J183)


//___184
var geometry = new THREE.BoxGeometry(5, 5.01, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j184 = new THREE.Mesh(geometry, material);
scene.add(j184);

const jamin184 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7, 7.5));
const J184 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(2.5, -0.8, -85.9)
})
J184.quaternion.setFromEuler(0,0.1, 0);
J184.addShape(jamin184)
world.addBody(J184)


//___185
var geometry = new THREE.BoxGeometry(5, 5.0, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j185 = new THREE.Mesh(geometry, material);
scene.add(j185);

const jamin185 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7, 7.5));
const J185 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(2.8, -0.8, -71.3)
})
J185.quaternion.setFromEuler(0,-0.05, 0);
J185.addShape(jamin185)
world.addBody(J185)


//___186
var geometry = new THREE.BoxGeometry(5, 5.0, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  color:'red'
});
var j186 = new THREE.Mesh(geometry, material);
scene.add(j186);

const jamin186 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7, 7.5));
const J186 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(2.6, -1.3, -71.8)
})
J186.quaternion.setFromEuler(-0.1,-0, 0);
J186.addShape(jamin186)
world.addBody(J186)

//___187
var geometry = new THREE.BoxGeometry(8, 5.0, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  color:'red'
});
var j187 = new THREE.Mesh(geometry, material);
scene.add(j187);

const jamin187 = new CANNON.Box(new CANNON.Vec3(4, 2.7, 7.5));
const J187 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-0.6, -0.8, -32)
})
J187.quaternion.setFromEuler(-0.1,0, 0);
J187.addShape(jamin187)
world.addBody(J187)



//___188
var geometry = new THREE.BoxGeometry(5, 5.0, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  color:'red'
});
var j188 = new THREE.Mesh(geometry, material);
scene.add(j188);

const jamin188 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7, 7.5));
const J188 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-7,-0.7, -32)
})
J188.quaternion.setFromEuler(-0,-0, 0.06);
J188.addShape(jamin188)
world.addBody(J188)



j186.visible = false;
j187.visible = false;

j188.visible = false;


//-------_-------_-------_-----

//___189 
var geometry = new THREE.BoxGeometry(15, 5.01, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j189 = new THREE.Mesh(geometry, material);
scene.add(j189);

const jamin189 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J189 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(72,0.5, 80)
})
J189.quaternion.setFromEuler(-0,-0,0);
J189.addShape(jamin189)
world.addBody(J189)


//___190 
var geometry = new THREE.BoxGeometry(15, 5.0, 5.01);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j190 = new THREE.Mesh(geometry, material);
scene.add(j190);

const jamin190 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J190 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(86,0.5, 80)
})
J190.quaternion.setFromEuler(-0,-0,0);
J190.addShape(jamin190)
world.addBody(J190)


//___191 
var geometry = new THREE.BoxGeometry(15, 5.01, 5.01);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j191 = new THREE.Mesh(geometry, material);
scene.add(j191);

const jamin191 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J191 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(99.8,0.5, 78)
})
J191.quaternion.setFromEuler(-0,0.3,0);
J191.addShape(jamin191)
world.addBody(J191)


//___192 
var geometry = new THREE.BoxGeometry(15, 5.0, 5.01);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j192 = new THREE.Mesh(geometry, material);
scene.add(j192);

const jamin192 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J192 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(110.8,0.5, 72)
})
J192.quaternion.setFromEuler(-0,0.7,0);
J192.addShape(jamin192)
world.addBody(J192)

//___193 
var geometry = new THREE.BoxGeometry(5, 5.01, 12);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j193 = new THREE.Mesh(geometry, material);
scene.add(j193);

const jamin193 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7, 6));
const J193 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(118.7, 0.5,63)
})
J193.quaternion.setFromEuler(-0, -0.5, 0);
J193.addShape(jamin193)
world.addBody(J193)

//___194 
var geometry = new THREE.BoxGeometry(15, 5.0, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j194 = new THREE.Mesh(geometry, material);
scene.add(j194);

const jamin194 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J194 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(126.5, 0.5,54)
})
J194.quaternion.setFromEuler(-0, 0.7, 0);
J194.addShape(jamin194)
world.addBody(J194)



//___195 
var geometry = new THREE.BoxGeometry(15, 5.01, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j195 = new THREE.Mesh(geometry, material);
scene.add(j195);

const jamin195 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J195 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(138, 0.5,49.7)
})
J195.quaternion.setFromEuler(-0, 0, 0);
J195.addShape(jamin195)
world.addBody(J195)



//___196 
var geometry = new THREE.BoxGeometry(15, 5.01, 5.01);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j196 = new THREE.Mesh(geometry, material);
scene.add(j196);

const jamin196 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J196 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(152.2, -0.2,49.7)
})
J196.quaternion.setFromEuler(-0, 0,-0.1);
J196.addShape(jamin196)
world.addBody(J196)

//-----_-------_-------_--------



//___197 
var geometry = new THREE.BoxGeometry(15, 5.01, 5.02);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j197 = new THREE.Mesh(geometry, material);
scene.add(j197);

const jamin197 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J197 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(164.2, -0.8, 49.7)
})
J197.quaternion.setFromEuler(-0, 0, -0);
J197.addShape(jamin197)
world.addBody(J197)

//___198 
var geometry = new THREE.BoxGeometry(15, 5.0, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j198 = new THREE.Mesh(geometry, material);
scene.add(j198);

const jamin198 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J198 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(178.2, -0.8, 48.3)
})
J198.quaternion.setFromEuler(-0, 0.2, -0);
J198.addShape(jamin198)
world.addBody(J198)




//-----_--------_------_------_--
//___199 
var geometry = new THREE.BoxGeometry(15, 5.01, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j199 = new THREE.Mesh(geometry, material);
scene.add(j199);

const jamin199 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J199 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(191.9, -0.8,44)
})
J199.quaternion.setFromEuler(-0, 0.4, -0);
J199.addShape(jamin199)
world.addBody(J199)


//___200 
var geometry = new THREE.BoxGeometry(15, 5.0, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j200 = new THREE.Mesh(geometry, material);
scene.add(j200);

const jamin200 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J200 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(203.7, -0.8,37.5)
})
J200.quaternion.setFromEuler(-0, 0.6, -0);
J200.addShape(jamin200)
world.addBody(J200)


//___201 
var geometry = new THREE.BoxGeometry(15, 5.01, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j201 = new THREE.Mesh(geometry, material);
scene.add(j201);

const jamin201 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J201 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(214.2, -0.8,28.7)
})
J201.quaternion.setFromEuler(-0, 0.8, -0);
J201.addShape(jamin201)
world.addBody(J201)


//___202 
var geometry = new THREE.BoxGeometry(15, 5.0, 5.8);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j202 = new THREE.Mesh(geometry, material);
scene.add(j202);

const jamin202 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.9));
const J202 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(220.4, -0.8,17.3)
})
J202.quaternion.setFromEuler(-0, 1.3, -0);
J202.addShape(jamin202)
world.addBody(J202)


//___203 
var geometry = new THREE.BoxGeometry(15, 5.01, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j203 = new THREE.Mesh(geometry, material);
scene.add(j203);

const jamin203 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J203 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(223.2, -0.8,3)
})
J203.quaternion.setFromEuler(-0, 1.5, -0);
J203.addShape(jamin203)
world.addBody(J203)


//___204 
var geometry = new THREE.BoxGeometry(15, 5.0, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j204 = new THREE.Mesh(geometry, material);
scene.add(j204);

const jamin204 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J204 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(224.1, -0.8,-11)
})
J204.quaternion.setFromEuler(-0, 1.50, -0);
J204.addShape(jamin204)
world.addBody(J204)


//___205
var geometry = new THREE.BoxGeometry(15, 5.01, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j205 = new THREE.Mesh(geometry, material);
scene.add(j205);

const jamin205 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J205 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(224.4, -0.8,-25)
})
J205.quaternion.setFromEuler(-0, 1.6, -0);
J205.addShape(jamin205)
world.addBody(J205)

//___206  
var geometry = new THREE.BoxGeometry(15, 5.0, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j206 = new THREE.Mesh(geometry, material);
scene.add(j206);

const jamin206 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J206 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(224, -0.8, -39.5)
})
J206.quaternion.setFromEuler(-0, 1.6, -0);
J206.addShape(jamin206)
world.addBody(J206)


//___207
var geometry = new THREE.BoxGeometry(15, 5.01, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j207 = new THREE.Mesh(geometry, material);
scene.add(j207);

const jamin207 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J207 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(223.6, -0.8, -54)
})
J207.quaternion.setFromEuler(-0, 1.6, -0);
J207.addShape(jamin207)
world.addBody(J207)


//___208 
var geometry = new THREE.BoxGeometry(15, 5.0, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j208 = new THREE.Mesh(geometry, material);
scene.add(j208);

const jamin208 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J208 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(223.1, -0.8, -68.9)
})
J208.quaternion.setFromEuler(-0, 1.6, -0);
J208.addShape(jamin208)
world.addBody(J208)


//___209  
var geometry = new THREE.BoxGeometry(15, 5.02, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j209 = new THREE.Mesh(geometry, material);
scene.add(j209);

const jamin209 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J209 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(223, -0.8, -75)
})
J209.quaternion.setFromEuler(-0, 1.6, -0);
J209.addShape(jamin209)
world.addBody(J209)



//___210
var geometry = new THREE.BoxGeometry(15, 5.02, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j210 = new THREE.Mesh(geometry, material);
scene.add(j210);

const jamin210 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 7.5));
const J210 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(237, 0.5, -75)
})
J210.quaternion.setFromEuler(-0, 1.6, -0.3);
J210.addShape(jamin210)
world.addBody(J210)


//___211
var geometry = new THREE.BoxGeometry(15, 5.02, 15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j211 = new THREE.Mesh(geometry, material);
scene.add(j211);

const jamin211 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 7.5));
const J211 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(240, 0.5, -70)
})
J211.quaternion.setFromEuler(0.3, 1.6, -0);
J211.addShape(jamin211)
world.addBody(J211)




//___212
var geometry = new THREE.BoxGeometry(80, 5.02, 80);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass_dirt.png'),
  
});
var j212 = new THREE.Mesh(geometry, material);
scene.add(j212);

const jamin212 = new CANNON.Box(new CANNON.Vec3(40,2.7,40));
const J212 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(104, 0.3, 80)
})
J212.quaternion.setFromEuler(0, 1.6, -0);
J212.addShape(jamin212)
world.addBody(J212)

//_____213
var geometry = new THREE.BoxGeometry(15, 5.02, 4.5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j213 = new THREE.Mesh(geometry, material);
scene.add(j213);

const jamin213 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.25));
const J213 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(223, -0.7, -73)
})
J213.quaternion.setFromEuler(-0, 1.6, -0);
J213.addShape(jamin213)
world.addBody(J213)

//_____214
var geometry = new THREE.BoxGeometry(15, 5.02, 4.5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j214 = new THREE.Mesh(geometry, material);
scene.add(j214);

const jamin214 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.25));
const J214 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(223.5, -0.7, -58)
})
J214.quaternion.setFromEuler(-0, 1.6, -0);
J214.addShape(jamin214)
world.addBody(J214)



//_____215
var geometry = new THREE.BoxGeometry(15, 5.02, 4.5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j215 = new THREE.Mesh(geometry, material);
scene.add(j215);

const jamin215 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.25));
const J215 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(224, -0.7, -42)
})
J215.quaternion.setFromEuler(-0, 1.6, -0);
J215.addShape(jamin215)
world.addBody(J215)


//_____216
var geometry = new THREE.BoxGeometry(15, 5.01, 4.5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j216 = new THREE.Mesh(geometry, material);
scene.add(j216);

const jamin216 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.25));
const J216 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(224.4, -0.7, -28)
})
J216.quaternion.setFromEuler(-0, 1.6, -0);
J216.addShape(jamin216)
world.addBody(J216)


//_____217
var geometry = new THREE.BoxGeometry(15, 5.02, 4.5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j217 = new THREE.Mesh(geometry, material);
scene.add(j217);

const jamin217 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.25));
const J217 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(224.3, -0.7, -14)
})
J217.quaternion.setFromEuler(-0, 1.51, -0);
J217.addShape(jamin217)
world.addBody(J217)


//_____218
var geometry = new THREE.BoxGeometry(15, 5.01, 4.5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j218 = new THREE.Mesh(geometry, material);
scene.add(j218);

const jamin218 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.25));
const J218 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(223.3, -0.7, 0.5)
})
J218.quaternion.setFromEuler(-0, 1.51, -0);
J218.addShape(jamin218)
world.addBody(J218)



//_____219
var geometry = new THREE.BoxGeometry(18, 5.02, 4.5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j219 = new THREE.Mesh(geometry, material);
scene.add(j219);

const jamin219 = new CANNON.Box(new CANNON.Vec3(9, 2.7, 2.25));
const J219 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(220.7, -0.7, 16)
})
J219.quaternion.setFromEuler(-0, 1.3, -0);
J219.addShape(jamin219)
world.addBody(J219)


//_____220
var geometry = new THREE.BoxGeometry(15, 5.01, 4.5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j220 = new THREE.Mesh(geometry, material);
scene.add(j220);

const jamin220 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.25));
const J220 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(214, -0.7, 28.9)
})
J220.quaternion.setFromEuler(-0, 0.8, -0);
J220.addShape(jamin220)
world.addBody(J220)



//_____221
var geometry = new THREE.BoxGeometry(15, 5.02, 4.5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j221 = new THREE.Mesh(geometry, material);
scene.add(j221);

const jamin221 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.25));
const J221 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(203, -0.7, 38)
})
J221.quaternion.setFromEuler(-0, 0.6, 0);
J221.addShape(jamin221)
world.addBody(J221)


//_____222
var geometry = new THREE.BoxGeometry(15, 5.01, 4.5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j222 = new THREE.Mesh(geometry, material);
scene.add(j222);

const jamin222 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.25));
const J222 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(191.9, -0.7, 44)
})
J222.quaternion.setFromEuler(-0, 0.4, 0);
J222.addShape(jamin222)
world.addBody(J222)

//_____223
var geometry = new THREE.BoxGeometry(15, 5.02, 4.5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j223 = new THREE.Mesh(geometry, material);
scene.add(j223);

const jamin223 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.25));
const J223 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(178.2, -0.7, 48.3)
})
J223.quaternion.setFromEuler(-0, 0.2, 0);
J223.addShape(jamin223)
world.addBody(J223)


//_____224
var geometry = new THREE.BoxGeometry(15, 5.01, 4.5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j224 = new THREE.Mesh(geometry, material);
scene.add(j224);

const jamin224 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.25));
const J224 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(164.2, -0.7, 49.7)
})
J224.quaternion.setFromEuler(-0, 0, 0);
J224.addShape(jamin224)
world.addBody(J224)


//_____225
var geometry = new THREE.BoxGeometry(15, 5.02, 4.5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j225 = new THREE.Mesh(geometry, material);
scene.add(j225);

const jamin225 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.25));
const J225 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(152.2, -0.2,49.7)
})
J225.quaternion.setFromEuler(-0, 0,-0.1);
J225.addShape(jamin225)
world.addBody(J225)



//_____226
var geometry = new THREE.BoxGeometry(15, 5.03, 4.5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j226 = new THREE.Mesh(geometry, material);
scene.add(j226);

const jamin226 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.25));
const J226 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(138, 0.5,49.7)
})
J226.quaternion.setFromEuler(-0, 0,0);
J226.addShape(jamin226)
world.addBody(J226)



//_____227
var geometry = new THREE.BoxGeometry(15, 5.02, 4.5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j227 = new THREE.Mesh(geometry, material);
scene.add(j227);

const jamin227 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.25));
const J227 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(126.5, 0.5,54)
})
J227.quaternion.setFromEuler(-0, 0.7,0);
J227.addShape(jamin227)
world.addBody(J227)



//_____228
var geometry = new THREE.BoxGeometry(4.2, 5.03, 12);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j228 = new THREE.Mesh(geometry, material);
scene.add(j228);

const jamin228 = new CANNON.Box(new CANNON.Vec3(2.1, 2.7,6));
const J228 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(118.4, 0.5,63.2)
})
J228.quaternion.setFromEuler(-0, -0.5,0);
J228.addShape(jamin228)
world.addBody(J228)



//_____229
var geometry = new THREE.BoxGeometry(15, 5.02, 4.3);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j229 = new THREE.Mesh(geometry, material);
scene.add(j229);

const jamin229 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.15));
const J229 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(110.8,0.5, 72)
})
J229.quaternion.setFromEuler(-0, 0.7,0);
J229.addShape(jamin229)
world.addBody(J229)



//_____230
var geometry = new THREE.BoxGeometry(15, 5.03, 4.3);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j230 = new THREE.Mesh(geometry, material);
scene.add(j230);

const jamin230 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.15));
const J230 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(99.8,0.5, 78)
})
J230.quaternion.setFromEuler(-0, 0.3,0);
J230.addShape(jamin230)
world.addBody(J230)


//_____231
var geometry = new THREE.BoxGeometry(15, 5.02, 4.3);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j231 = new THREE.Mesh(geometry, material);
scene.add(j231);

const jamin231 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.15));
const J231 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(86,0.5, 80.1)
})
J231.quaternion.setFromEuler(-0, 0, 0);
J231.addShape(jamin231)
world.addBody(J231)


//_____232
var geometry = new THREE.BoxGeometry(15, 5.03, 4.3);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j232 = new THREE.Mesh(geometry, material);
scene.add(j232);

const jamin232 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.15));
const J232 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(72,0.5, 80.1)
})
J232.quaternion.setFromEuler(-0, 0, 0);
J232.addShape(jamin232)
world.addBody(J232)


//_____mod________

//_____233 apple
var geometry = new THREE.BoxGeometry(15, 5.03, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j233 = new THREE.Mesh(geometry, material);
scene.add(j233);

const jamin233 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J233 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(72,0.9, 80.1)
})
J233.quaternion.setFromEuler(-0, 0,-0.1);
J233.addShape(jamin233)
world.addBody(J233)

//_____234 
var geometry = new THREE.BoxGeometry(15, 5.03, 5.01);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j234 = new THREE.Mesh(geometry, material);
scene.add(j234);

const jamin234 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J234 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(61,2, 80.1)
})
J234.quaternion.setFromEuler(-0, 0, -0.1);
J234.addShape(jamin234)
world.addBody(J234)


//_____235 
var geometry = new THREE.BoxGeometry(15, 5.03, 5.01);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j235 = new THREE.Mesh(geometry, material);
scene.add(j235);

const jamin235 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J235 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(46.8,2.7, 80.1)
})
J235.quaternion.setFromEuler(-0, 0, -0);
J235.addShape(jamin235)
world.addBody(J235)


//_____236 
var geometry = new THREE.BoxGeometry(15, 5.02, 5.01);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j236 = new THREE.Mesh(geometry, material);
scene.add(j236);

const jamin236 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J236 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(32,2.7, 80.1)
})
J236.quaternion.setFromEuler(-0, 0, -0);
J236.addShape(jamin236)
world.addBody(J236)



//_____237 
var geometry = new THREE.BoxGeometry(15, 5.03, 5.01);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j237 = new THREE.Mesh(geometry, material);
scene.add(j237);

const jamin237 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J237 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(17.4,2.7, 80.1)
})
J237.quaternion.setFromEuler(-0, 0, -0);
J237.addShape(jamin237)
world.addBody(J237)

//_____238 
var geometry = new THREE.BoxGeometry(20, 5.02, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j238 = new THREE.Mesh(geometry, material);
scene.add(j238);

const jamin238 = new CANNON.Box(new CANNON.Vec3(10, 2.7, 5));
const J238 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(9.3,2.7, 87.5)
})
J238.quaternion.setFromEuler(-0, 1.6, -0);
J238.addShape(jamin238)
world.addBody(J238)





//_____239 
var geometry = new THREE.BoxGeometry(15, 5.03, 5.01);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j239 = new THREE.Mesh(geometry, material);
scene.add(j239);

const jamin239 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J239 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(21,3.5, 95)
})
J239.quaternion.setFromEuler(-0, 0, 0.1);
J239.addShape(jamin239)
world.addBody(J239)

//_____240 
var geometry = new THREE.BoxGeometry(15, 5.03, 5.01);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j240 = new THREE.Mesh(geometry, material);
scene.add(j240);

const jamin240 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J240 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(35.5,4.9, 95)
})
J240.quaternion.setFromEuler(-0, 0, 0.1);
J240.addShape(jamin240)
world.addBody(J240)


//_____241 
var geometry = new THREE.BoxGeometry(15, 5.03, 5.01);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j241 = new THREE.Mesh(geometry, material);
scene.add(j241);

const jamin241 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J241 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(50,5.6, 95)
})
J241.quaternion.setFromEuler(-0, 0, 0);
J241.addShape(jamin241)
world.addBody(J241)



//_____242 
var geometry = new THREE.BoxGeometry(15, 5.03, 5.01);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j242 = new THREE.Mesh(geometry, material);
scene.add(j242);

const jamin242 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J242 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(64.7,6.3, 95)
})
J242.quaternion.setFromEuler(-0, 0, 0.1);
J242.addShape(jamin242)
world.addBody(J242)


//_____243 
var geometry = new THREE.BoxGeometry(15, 5.03, 5.01);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j243 = new THREE.Mesh(geometry, material);
scene.add(j243);

const jamin243 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J243 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(79,7, 95)
})
J243.quaternion.setFromEuler(-0, 0, 0);
J243.addShape(jamin243)
world.addBody(J243)


//_____244 
var geometry = new THREE.BoxGeometry(20, 5.02, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j244 = new THREE.Mesh(geometry, material);
scene.add(j244);

const jamin244 = new CANNON.Box(new CANNON.Vec3(10, 2.7, 5));
const J244 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(90,7, 102)
})
J244.quaternion.setFromEuler(-0, 1.6, -0);
J244.addShape(jamin244)
world.addBody(J244)


//_____245 
var geometry = new THREE.BoxGeometry(20, 5.03, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j245 = new THREE.Mesh(geometry, material);
scene.add(j245);

const jamin245 = new CANNON.Box(new CANNON.Vec3(10, 2.7, 5));
const J245 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(90.5,7, 120)
})
J245.quaternion.setFromEuler(-0, 1.6, -0);
J245.addShape(jamin245)
world.addBody(J245)

//_____246 
var geometry = new THREE.BoxGeometry(20, 5.03, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j246 = new THREE.Mesh(geometry, material);
scene.add(j246);

const jamin246 = new CANNON.Box(new CANNON.Vec3(10, 2.7, 5));
const J246 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(91.1,7, 140)
})
J246.quaternion.setFromEuler(-0, 1.6, -0);
J246.addShape(jamin246)
world.addBody(J246)



//_____247 
var geometry = new THREE.BoxGeometry(15, 5.03, 5.01);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j247 = new THREE.Mesh(geometry, material);
scene.add(j247);

const jamin247 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 2.5));
const J247 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(79.9,6.3, 147.5)
})
J247.quaternion.setFromEuler(-0, 0, 0.1);
J247.addShape(jamin247)
world.addBody(J247)


//_____248
var geometry = new THREE.BoxGeometry(15, 5.03, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j248 = new THREE.Mesh(geometry, material);
scene.add(j248);

const jamin248 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 5));
const J248 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(67, 5.5, 147.5)
})
J248.quaternion.setFromEuler(-0, 0, 0);
J248.addShape(jamin248)
world.addBody(J248)



//_____249
var geometry = new THREE.BoxGeometry(15, 5.03, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j249 = new THREE.Mesh(geometry, material);
scene.add(j249);

const jamin249 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 5));
const J249 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(53,4.8, 147.5)
})
J249.quaternion.setFromEuler(-0, 0, 0.1);
J249.addShape(jamin249)
world.addBody(J249)


//_____250
var geometry = new THREE.BoxGeometry(15, 5.03, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j250 = new THREE.Mesh(geometry, material);
scene.add(j250);

const jamin250 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 5));
const J250 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(40,3.5, 147.5)
})
J250.quaternion.setFromEuler(-0, 0, 0.1);
J250.addShape(jamin250)
world.addBody(J250)


//_____251
var geometry = new THREE.BoxGeometry(15, 5.03, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j251 = new THREE.Mesh(geometry, material);
scene.add(j251);

const jamin251 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 5));
const J251 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(28,2.3, 147.5)
})
J251.quaternion.setFromEuler(-0, 0, 0.1);
J251.addShape(jamin251)
world.addBody(J251)


//_____252
var geometry = new THREE.BoxGeometry(15, 5.03, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j252 = new THREE.Mesh(geometry, material);
scene.add(j252);

const jamin252 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 5));
const J252 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(15,1.0, 147.5)
})
J252.quaternion.setFromEuler(-0, 0, 0.1);
J252.addShape(jamin252)
world.addBody(J252)


//_____253
var geometry = new THREE.BoxGeometry(15, 5.03, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j253 = new THREE.Mesh(geometry, material);
scene.add(j253);

const jamin253 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 5));
const J253 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(1,-0.4, 147.5)
})
J253.quaternion.setFromEuler(-0, 0, 0.1);
J253.addShape(jamin253)
world.addBody(J253)


//_____254 
var geometry = new THREE.BoxGeometry(15, 5.03, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j254 = new THREE.Mesh(geometry, material);
scene.add(j254);

const jamin254 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 5));
const J254 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-5,-0.9, 147.5)
})
J254.quaternion.setFromEuler(-0, 0, 0);
J254.addShape(jamin254)
world.addBody(J254)

//_____255 
var geometry = new THREE.BoxGeometry(15, 5.02, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j255 = new THREE.Mesh(geometry, material);
scene.add(j255);

const jamin255 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 5));
const J255 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-5,-0.9, 138)
})
J255.quaternion.setFromEuler(-0, 0, 0);
J255.addShape(jamin255)
world.addBody(J255)


//_____256 
var geometry = new THREE.BoxGeometry(5, 5.03, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j256 = new THREE.Mesh(geometry, material);
scene.add(j256);

const jamin256 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7,2.5));
const J256 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-5,-0.9, 132)
})
J256.quaternion.setFromEuler(-0, -0.3, 0);
J256.addShape(jamin256)
world.addBody(J256)


//_____257 
var geometry = new THREE.BoxGeometry(5, 5.02, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j257 = new THREE.Mesh(geometry, material);
scene.add(j257);

const jamin257 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7,2.5));
const J257 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-3.4,-0.9, 129)
})
J257.quaternion.setFromEuler(-0, -0.7, 0);
J257.addShape(jamin257)
world.addBody(J257)

//_____258 
var geometry = new THREE.BoxGeometry(5, 5.03, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j258 = new THREE.Mesh(geometry, material);
scene.add(j258);

const jamin258 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7,2.5));
const J258 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-1.6,-0.9, 128.2)
})
J258.quaternion.setFromEuler(-0, -1.6, 0);
J258.addShape(jamin258)
world.addBody(J258)


//_____259 
var geometry = new THREE.BoxGeometry(5, 5.03, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j259 = new THREE.Mesh(geometry, material);
scene.add(j259);

const jamin259 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7,5));
const J259 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(5.7,-0.9, 128.4)
})
J259.quaternion.setFromEuler(-0, -1.6, 0);
J259.addShape(jamin259)
world.addBody(J259)


//_____260 
var geometry = new THREE.BoxGeometry(5, 5.02, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j260 = new THREE.Mesh(geometry, material);
scene.add(j260);

const jamin260 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7,5));
const J260 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(15,-0.9, 128.7)
})
J260.quaternion.setFromEuler(-0, -1.6, 0);
J260.addShape(jamin260)
world.addBody(J260)



//_____261 
var geometry = new THREE.BoxGeometry(5, 5.02, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j261 = new THREE.Mesh(geometry, material);
scene.add(j261);

const jamin261 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7,5));
const J261 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(25,-0.9, 129)
})
J261.quaternion.setFromEuler(-0, -1.6, 0);
J261.addShape(jamin261)
world.addBody(J261)


//_____262 
var geometry = new THREE.BoxGeometry(5, 5.03, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j262 = new THREE.Mesh(geometry, material);
scene.add(j262);

const jamin262 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7,5));
const J262 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(33,-0.9, 129.3)
})
J262.quaternion.setFromEuler(-0, -1.6, 0);
J262.addShape(jamin262)
world.addBody(J262)


//_____263 
var geometry = new THREE.BoxGeometry(5, 5.02, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j263 = new THREE.Mesh(geometry, material);
scene.add(j263);

const jamin263 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7,5));
const J263 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(42,-0.9, 129.6)
})
J263.quaternion.setFromEuler(-0, -1.6, 0);
J263.addShape(jamin263)
world.addBody(J263)


//_____264 
var geometry = new THREE.BoxGeometry(5, 5.03, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j264 = new THREE.Mesh(geometry, material);
scene.add(j264);

const jamin264 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7,5));
const J264 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(49.5,-0.9, 127.5)
})
J264.quaternion.setFromEuler(-0, -1, 0);
J264.addShape(jamin264)
world.addBody(J264)


//_____265 
var geometry = new THREE.BoxGeometry(5, 5.02, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg'),
  
});
var j265 = new THREE.Mesh(geometry, material);
scene.add(j265);

const jamin265 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7,5));
const J265 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(53.6,-0.9, 121)
})
J265.quaternion.setFromEuler(-0, -0.2, 0);
J265.addShape(jamin265)
world.addBody(J265)
//----_-----_-----_-----


//_____266
var geometry = new THREE.BoxGeometry(6, 5.01, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j266 = new THREE.Mesh(geometry, material);
scene.add(j266);

const jamin266 = new CANNON.Box(new CANNON.Vec3(3, 2.7,5));
const J266 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(53.6,-0.9, 121)
})
J266.quaternion.setFromEuler(-0, -0.2, 0);
J266.addShape(jamin266)
world.addBody(J266)


//_____267
var geometry = new THREE.BoxGeometry(6, 5.0, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j267 = new THREE.Mesh(geometry, material);
scene.add(j267);

const jamin267 = new CANNON.Box(new CANNON.Vec3(3, 2.7,5));
const J267 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(49.5,-0.9, 127.5)
})
J267.quaternion.setFromEuler(-0, -1, 0);
J267.addShape(jamin267)
world.addBody(J267)


//_____268 
var geometry = new THREE.BoxGeometry(6, 5.01, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j268 = new THREE.Mesh(geometry, material);
scene.add(j268);

const jamin268 = new CANNON.Box(new CANNON.Vec3(3, 2.7,5));
const J268 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(42,-0.9, 129.6)
})
J268.quaternion.setFromEuler(-0, -1.6, 0);
J268.addShape(jamin268)
world.addBody(J268)


//_____269
var geometry = new THREE.BoxGeometry(6, 5.0, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j269 = new THREE.Mesh(geometry, material);
scene.add(j269);

const jamin269 = new CANNON.Box(new CANNON.Vec3(3, 2.7,5));
const J269 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(33,-0.9, 129.3)
})
J269.quaternion.setFromEuler(-0, -1.6, 0);
J269.addShape(jamin269)
world.addBody(J269)



//_____270
var geometry = new THREE.BoxGeometry(6, 5.01, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j270 = new THREE.Mesh(geometry, material);
scene.add(j270);

const jamin270 = new CANNON.Box(new CANNON.Vec3(3, 2.7, 5));
const J270 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(25, -0.9, 129)
})
J270.quaternion.setFromEuler(-0, -1.6, 0);
J270.addShape(jamin270)
world.addBody(J270)


//_____271
var geometry = new THREE.BoxGeometry(6, 5.01, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j271 = new THREE.Mesh(geometry, material);
scene.add(j271);

const jamin271 = new CANNON.Box(new CANNON.Vec3(3, 2.7,5));
const J271 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(15,-0.9, 128.7)
})
J271.quaternion.setFromEuler(-0, -1.6, 0);
J271.addShape(jamin271)
world.addBody(J271)


//_____272
var geometry = new THREE.BoxGeometry(6, 5.02, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j272 = new THREE.Mesh(geometry, material);
scene.add(j272);

const jamin272 = new CANNON.Box(new CANNON.Vec3(2.5, 2.7,5));
const J272 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(5.7,-0.9, 128.4)
})
J272.quaternion.setFromEuler(-0, -1.6, 0);
J272.addShape(jamin272)
world.addBody(J272)


//_____273
var geometry = new THREE.BoxGeometry(6, 5.01, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j273 = new THREE.Mesh(geometry, material);
scene.add(j273);

const jamin273 = new CANNON.Box(new CANNON.Vec3(3, 2.7,2.5));
const J273 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-1.6,-0.9, 128.2)
})
J273.quaternion.setFromEuler(-0, -1.6, 0);
J273.addShape(jamin273)
world.addBody(J273)


//_____274
var geometry = new THREE.BoxGeometry(6, 5.0, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j274 = new THREE.Mesh(geometry, material);
scene.add(j274);

const jamin274 = new CANNON.Box(new CANNON.Vec3(3, 2.7, 2.5));
const J274 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-3.4, -0.9, 129)
})
J274.quaternion.setFromEuler(-0, -0.7, 0);
J274.addShape(jamin274)
world.addBody(J274)


//_____275
var geometry = new THREE.BoxGeometry(6, 5.01, 5);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j275 = new THREE.Mesh(geometry, material);
scene.add(j275);

const jamin275 = new CANNON.Box(new CANNON.Vec3(3, 2.7,2.5));
const J275 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-5,-0.9, 132)
})
J275.quaternion.setFromEuler(-0, -0.3, 0);
J275.addShape(jamin275)
world.addBody(J275)


//_____276
var geometry = new THREE.BoxGeometry(16, 5.0, 11);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j276 = new THREE.Mesh(geometry, material);
scene.add(j276);

const jamin276 = new CANNON.Box(new CANNON.Vec3(8, 2.7, 5.5));
const J276 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-5, -0.9, 138)
})
J276.quaternion.setFromEuler(-0, 0, 0);
J276.addShape(jamin276)
world.addBody(J276)



//_____277
var geometry = new THREE.BoxGeometry(16.01, 5.01, 11);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j277= new THREE.Mesh(geometry, material);
scene.add(j277);

const jamin277 = new CANNON.Box(new CANNON.Vec3(8, 2.7, 5.5));
const J277 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-5, -0.9, 147.5)
})
J277.quaternion.setFromEuler(-0, 0, 0);
J277.addShape(jamin277)
world.addBody(J277)


//_____278
var geometry = new THREE.BoxGeometry(15, 5.02, 6);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j278 = new THREE.Mesh(geometry, material);
scene.add(j278);

const jamin278 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J278 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(79.9, 6.3, 147.5)
})
J278.quaternion.setFromEuler(-0, 0, 0.1);
J278.addShape(jamin278)
world.addBody(J278)



//_____279
var geometry = new THREE.BoxGeometry(21, 5.01, 11);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j279 = new THREE.Mesh(geometry, material);
scene.add(j279);

const jamin279 = new CANNON.Box(new CANNON.Vec3(10.5, 2.7, 5.5));
const J279 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(91.1,7, 140)
})
J279.quaternion.setFromEuler(-0, 1.6, -0);
J279.addShape(jamin279)
world.addBody(J279)


//_____280
var geometry = new THREE.BoxGeometry(21, 5.0, 11);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j280 = new THREE.Mesh(geometry, material);
scene.add(j280);

const jamin280 = new CANNON.Box(new CANNON.Vec3(10.5, 2.7, 5.5));
const J280 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(90.5,7, 120)
})
J280.quaternion.setFromEuler(-0, 1.6, -0);
J280.addShape(jamin280)
world.addBody(J280)


//_____281
var geometry = new THREE.BoxGeometry(21, 5.01, 11);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j281 = new THREE.Mesh(geometry, material);
scene.add(j281);

const jamin281 = new CANNON.Box(new CANNON.Vec3(10.5, 2.7, 5.5));
const J281 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(90,7, 102)
})
J281.quaternion.setFromEuler(-0, 1.6, -0);
J281.addShape(jamin281)
world.addBody(J281)


//_____282
var geometry = new THREE.BoxGeometry(15, 5.0, 6);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j282 = new THREE.Mesh(geometry, material);
scene.add(j282);

const jamin282 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J282 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(79,7, 95)
})
J282.quaternion.setFromEuler(-0, 0, 0);
J282.addShape(jamin282)
world.addBody(J282)

//_____283
var geometry = new THREE.BoxGeometry(15, 5.01, 6.01);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
});
var j283 = new THREE.Mesh(geometry, material);
scene.add(j283);

const jamin283 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7,3));
const J283 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(64.7,6.3, 95)
})
J283.quaternion.setFromEuler(-0, 0, 0.1);
J283.addShape(jamin283)
world.addBody(J283)

//_____284
var geometry = new THREE.BoxGeometry(15, 5.01, 6.02);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
});
var j284 = new THREE.Mesh(geometry, material);
scene.add(j284);

const jamin284 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7,3));
const J284 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(50,5.6, 95)
})
J284.quaternion.setFromEuler(-0, 0, 0);
J284.addShape(jamin284)
world.addBody(J284)



//_____285
var geometry = new THREE.BoxGeometry(15, 5.01, 6.0);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
});
var j285 = new THREE.Mesh(geometry, material);
scene.add(j285);

const jamin285 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7,3));
const J285 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(35.5,4.9, 95)
})
J285.quaternion.setFromEuler(-0, 0, 0.1);
J285.addShape(jamin285)
world.addBody(J285)


//_____286
var geometry = new THREE.BoxGeometry(15, 5.01, 6.01);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
});
var j286 = new THREE.Mesh(geometry, material);
scene.add(j286);

const jamin286 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7,3));

const J286 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(21,3.5, 95)
})
J286.quaternion.setFromEuler(-0, 0, 0.1);
J286.addShape(jamin286)
world.addBody(J286)


//_____287 
var geometry = new THREE.BoxGeometry(21, 5.01, 11);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j287 = new THREE.Mesh(geometry, material);
scene.add(j287);

const jamin287 = new CANNON.Box(new CANNON.Vec3(10.5, 2.7,5.5));
const J287 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(9.3,2.7, 87.5)
})
J287.quaternion.setFromEuler(-0, 1.6, -0);
J287.addShape(jamin287)
world.addBody(J287)


//_____288
var geometry = new THREE.BoxGeometry(15, 5.0, 6);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j288 = new THREE.Mesh(geometry, material);
scene.add(j288);

const jamin288 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J288 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(17.4,2.7, 80.1)
})
J288.quaternion.setFromEuler(-0, 0, -0);
J288.addShape(jamin288)
world.addBody(J288)



//_____289
var geometry = new THREE.BoxGeometry(15, 5.01, 6.01);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j289 = new THREE.Mesh(geometry, material);
scene.add(j289);

const jamin289 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J289 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(32,2.7, 80.1)
})
J289.quaternion.setFromEuler(-0, 0, -0);
J289.addShape(jamin289)
world.addBody(J289)


//_____290
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j290 = new THREE.Mesh(geometry, material);
scene.add(j290);

const jamin290 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J290 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(46.8,2.7, 80.1)
})
J290.quaternion.setFromEuler(-0, 0, -0);
J290.addShape(jamin290)
world.addBody(J290)


//_____291
var geometry = new THREE.BoxGeometry(15, 5.01, 6.01);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j291 = new THREE.Mesh(geometry, material);
scene.add(j291);

const jamin291 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J291 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(61,2, 80.1)
})
J291.quaternion.setFromEuler(-0, 0, -0.1);
J291.addShape(jamin291)
world.addBody(J291)

//_____292
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j292 = new THREE.Mesh(geometry, material);
scene.add(j292);

const jamin292 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J292 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(72,0.9, 80.1)
})
J292.quaternion.setFromEuler(-0, 0, -0.1);
J292.addShape(jamin292)
world.addBody(J292)



//_____293
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j293 = new THREE.Mesh(geometry, material);
scene.add(j293);

const jamin293 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J293 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(67,7, 140)
})
J293.quaternion.setFromEuler(0.6, 0, -0.1);
J293.addShape(jamin293)
world.addBody(J293)


//_____294
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j294 = new THREE.Mesh(geometry, material);
scene.add(j294);

const jamin294 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J294 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(54,5.5, 140)
})
J294.quaternion.setFromEuler(-0.2, 0, 0.1);
J294.addShape(jamin294)
world.addBody(J294)



//_____295
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j295 = new THREE.Mesh(geometry, material);
scene.add(j295);

const jamin295 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J295 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(38,3, 142)
})
J295.quaternion.setFromEuler(-0.6, 0, 0.1);
J295.addShape(jamin295)
world.addBody(J295)


//_____296
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j296 = new THREE.Mesh(geometry, material);
scene.add(j296);

const jamin296 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J296 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(25,2, 142)
})
J296.quaternion.setFromEuler(-0.6, 0, 0);
J296.addShape(jamin296)
world.addBody(J296)


//_____297
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j297 = new THREE.Mesh(geometry, material);
scene.add(j297);

const jamin297 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J297 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(12, 1, 142)
})
J297.quaternion.setFromEuler(0, -0.1, 0);
J297.addShape(jamin297)
world.addBody(J297)



//_____298
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j298 = new THREE.Mesh(geometry, material);
scene.add(j298);

const jamin298 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J298 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(2,-3.7, 139)
})
J298.quaternion.setFromEuler(-0.8,1.6, -0.5);
J298.addShape(jamin298)
world.addBody(J298)


//_____299
var geometry = new THREE.BoxGeometry(10, 5.0, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j299 = new THREE.Mesh(geometry, material);
scene.add(j299);

const jamin299 = new CANNON.Box(new CANNON.Vec3(5, 2.7,5));
const J299 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-13,-0.5, 122)
})
J299.quaternion.setFromEuler(0,0,0);
J299.addShape(jamin299)
world.addBody(J299)




//_____300
var geometry = new THREE.BoxGeometry(10, 5.0, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j300 = new THREE.Mesh(geometry, material);
scene.add(j300);

const jamin300 = new CANNON.Box(new CANNON.Vec3(5, 2.7,5));
const J300 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-3,-0.8, 118)
})
J300.quaternion.setFromEuler(-0.1,0, 0);
J300.addShape(jamin300)
world.addBody(J300)


//_____301
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j301 = new THREE.Mesh(geometry, material);
scene.add(j301);

const jamin301 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J301 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-10,1, 120.5)
})
J301.quaternion.setFromEuler(-0.3,0, -0.3);
J301.addShape(jamin301)
world.addBody(J301)


//_____302
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j302 = new THREE.Mesh(geometry, material);
scene.add(j302);

const jamin302 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J302 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(10,1, 120.5)
})
J302.quaternion.setFromEuler(-0.3,0, -0.3);
J302.addShape(jamin302)
world.addBody(J302)



//_____303
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j303 = new THREE.Mesh(geometry, material);
scene.add(j303);

const jamin303 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J303 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(20,1, 120)
})
J303.quaternion.setFromEuler(-0.3,0, 0.3);
J303.addShape(jamin303)
world.addBody(J303)



//_____304
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j304 = new THREE.Mesh(geometry, material);
scene.add(j304);

const jamin304 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J304 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(35,1, 120.5)
})
J304.quaternion.setFromEuler(0.3,0, -0.3);
J304.addShape(jamin304)
world.addBody(J304)


//_____305
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j305 = new THREE.Mesh(geometry, material);
scene.add(j305);

const jamin305 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J305 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(40,-1, 118)
})
J305.quaternion.setFromEuler(0.3,1.6, -0.6);
J305.addShape(jamin305)
world.addBody(J305)


//_____306
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j306 = new THREE.Mesh(geometry, material);
scene.add(j306);

const jamin306 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J306 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(61,-1, 118)
})
J306.quaternion.setFromEuler(0.3,1.6, -0.6);
J306.addShape(jamin306)
world.addBody(J306)


//_____307
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j307 = new THREE.Mesh(geometry, material);
scene.add(j307);

const jamin307 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J307 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(64,-1, 114)
})
J307.quaternion.setFromEuler(0.3,1.6, -0.6);
J307.addShape(jamin307)
world.addBody(J307)


//_____308
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j308 = new THREE.Mesh(geometry, material);
scene.add(j308);

const jamin308 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J308 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(64.5,-1, 118)
})
J308.quaternion.setFromEuler(0.6,1.6, -0.3);
J308.addShape(jamin308)
world.addBody(J308)


//_____309
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j309 = new THREE.Mesh(geometry, material);
scene.add(j309);

const jamin309 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J309 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-25,-0, 97)
})
J309.quaternion.setFromEuler(0.3,0, 0.3);
J309.addShape(jamin309)
world.addBody(J309)



//_____310
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j310 = new THREE.Mesh(geometry, material);
scene.add(j310);

const jamin310 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J310 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-13,-0, 93)
})
J310.quaternion.setFromEuler(-0.3,0, -0.3);
J310.addShape(jamin310)
world.addBody(J310)


//_____311
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j311 = new THREE.Mesh(geometry, material);
scene.add(j311);

const jamin311 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J311 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-8,-0, 93)
})
J311.quaternion.setFromEuler(0.2,0, -0.3);
J311.addShape(jamin311)
world.addBody(J311)


//_____312
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j312 = new THREE.Mesh(geometry, material);
scene.add(j312);

const jamin312 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J312 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-12,-1.2, 98)
})
J312.quaternion.setFromEuler(0.1,0, -0.3);
J312.addShape(jamin312)
world.addBody(J312)


//_____313
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j313 = new THREE.Mesh(geometry, material);
scene.add(j313);

const jamin313 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J313 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(30, 1.7, 86)
})
J313.quaternion.setFromEuler(0.3, 0, -0.3);
J313.addShape(jamin313)
world.addBody(J313)


//_____314
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j314 = new THREE.Mesh(geometry, material);
scene.add(j314);

const jamin314 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J314 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(30, 1.7, 88)
})
J314.quaternion.setFromEuler(-0.2, 0, 0.2);
J314.addShape(jamin314)
world.addBody(J314)


//_____315
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j315 = new THREE.Mesh(geometry, material);
scene.add(j315);

const jamin315 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J315 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(44, 1.7, 87)
})
J315.quaternion.setFromEuler(0.2, 0, -0.2);
J315.addShape(jamin315)
world.addBody(J315)


//_____316
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j316 = new THREE.Mesh(geometry, material);
scene.add(j316);

const jamin316 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J316 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(70, 1.7, 87)
})
J316.quaternion.setFromEuler(0.2, 0, -0.2);
J316.addShape(jamin316)
world.addBody(J316)


//_____317
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j317 = new THREE.Mesh(geometry, material);
scene.add(j317);

const jamin317 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J317 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(30, 1.7, 70)
})
J317.quaternion.setFromEuler(0.2, 0, -0.2);
J317.addShape(jamin317)
world.addBody(J317)


//_____318
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j318 = new THREE.Mesh(geometry, material);
scene.add(j318);

const jamin318 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J318 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(18, 1.7, 70)
})
J318.quaternion.setFromEuler(-0.6, 0, -0.2);
J318.addShape(jamin318)
world.addBody(J318)


//_____319
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j319 = new THREE.Mesh(geometry, material);
scene.add(j319);

const jamin319 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J319 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(10, 1.7, 70)
})
J319.quaternion.setFromEuler(0.2, 0, -0.2);
J319.addShape(jamin319)
world.addBody(J319)


//_____320
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j320 = new THREE.Mesh(geometry, material);
scene.add(j320);

const jamin320 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J320 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(0, 1.7, 70)
})
J320.quaternion.setFromEuler(0.3,1.6, -0.2);
J320.addShape(jamin320)
world.addBody(J320)


//_____321
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j321 = new THREE.Mesh(geometry, material);
scene.add(j321);

const jamin321 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J321 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-3, 1.7, 80)
})
J321.quaternion.setFromEuler(-0.2,1.6, -0.2);
J321.addShape(jamin321)
world.addBody(J321)


//_____322
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j322 = new THREE.Mesh(geometry, material);
scene.add(j322);

const jamin322 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J322 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(0, 1.7, 90)
})
J322.quaternion.setFromEuler(0.4,1.6, -0.2);
J322.addShape(jamin322)
world.addBody(J322)

//_____323
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j323 = new THREE.Mesh(geometry, material);
scene.add(j323);

const jamin323 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J323 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(0, 1.7, 90)
})
J323.quaternion.setFromEuler(0.4,0, -0.2);
J323.addShape(jamin323)
world.addBody(J323)


//_____324
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j324 = new THREE.Mesh(geometry, material);
scene.add(j324);

const jamin324 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J324 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(104, 2, 40)
})
J324.quaternion.setFromEuler(0,0, -0.2);
J324.addShape(jamin324)
world.addBody(J324)


//_____325
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j325 = new THREE.Mesh(geometry, material);
scene.add(j325);

const jamin325 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J325 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(83, 2, 65)
})
J325.quaternion.setFromEuler(0,0, 0.2);
J325.addShape(jamin325)
world.addBody(J325)


//_____326
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j326 = new THREE.Mesh(geometry, material);
scene.add(j326);

const jamin326 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J326 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-120, -1,-180)
})
J326.quaternion.setFromEuler(0.5, 0, -0.2);
J326.addShape(jamin326)
world.addBody(J326)


//_____327
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j327 = new THREE.Mesh(geometry, material);
scene.add(j327);

const jamin327 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J327 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-120, -1, -180)
})
J327.quaternion.setFromEuler(-0.2, 0, 0.2);
J327.addShape(jamin327)
world.addBody(J327)


//_____328
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j328 = new THREE.Mesh(geometry, material);
scene.add(j328);

const jamin328 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J328 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-130, -1, -120)
})
J328.quaternion.setFromEuler(0.2, 0, 0.2);
J328.addShape(jamin328)
world.addBody(J328)


//_____329
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j329 = new THREE.Mesh(geometry, material);
scene.add(j329);

const jamin329 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J329 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-120, -1, -110)
})
J329.quaternion.setFromEuler(0.2,0, -0.2);
J329.addShape(jamin329)
world.addBody(J329)



//_____330
var geometry = new THREE.BoxGeometry(15, 5.0, 6.0);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j330 = new THREE.Mesh(geometry, material);
scene.add(j330);

const jamin330 = new CANNON.Box(new CANNON.Vec3(7.5, 2.7, 3));
const J330 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-120, -1, -130)
})
J330.quaternion.setFromEuler(0.2,0, -0.2);
J330.addShape(jamin330)
world.addBody(J330)
//-------------------
//----------new map------------

//_____331
var geometry = new THREE.BoxGeometry(50, 5.0,50);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png'),
  
});
var j331 = new THREE.Mesh(geometry, material);
scene.add(j331);

const jamin331 = new CANNON.Box(new CANNON.Vec3(25, 2.7,25));
const J331 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(170,-0.5, -96)
})
J331.quaternion.setFromEuler(0.1,0, 0);
J331.addShape(jamin331)
world.addBody(J331)


//_____332
var geometry = new THREE.BoxGeometry(50, 5.0,50);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png'),
  
});
var j332 = new THREE.Mesh(geometry, material);
scene.add(j332);

const jamin332 = new CANNON.Box(new CANNON.Vec3(25, 2.7,25));
const J332 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(170,-0.4, -130)
})
J332.quaternion.setFromEuler(0,0,-0.1);
J332.addShape(jamin332)
world.addBody(J332)


//_____333
var geometry = new THREE.BoxGeometry(50, 5.0,50);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg'),
  
});
var j333 = new THREE.Mesh(geometry, material);
scene.add(j333);

const jamin333 = new CANNON.Box(new CANNON.Vec3(25, 2.7,25));
const J333 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(172,-0.6, -145)
})
J333.quaternion.setFromEuler(0,0,-0);
J333.addShape(jamin333)
world.addBody(J333)


//_____334
var geometry = new THREE.BoxGeometry(49.5, 5.02,49.5);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/grass_dirt.png'),
  
});
var j334 = new THREE.Mesh(geometry, material);
scene.add(j334);

const jamin334 = new CANNON.Box(new CANNON.Vec3(24.75, 2.7,24.75));
const J334 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(172,-0.6, -145)
})
J334.quaternion.setFromEuler(0,0,-0);
J334.addShape(jamin334)
world.addBody(J334)




//_____335
var geometry = new THREE.BoxGeometry(50, 5.0,50);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j335 = new THREE.Mesh(geometry, material);
scene.add(j335);

const jamin335 = new CANNON.Box(new CANNON.Vec3(25, 2.7,25));
const J335 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(173,-0.6, -190)
})
J335.quaternion.setFromEuler(0,0,-0);
J335.addShape(jamin335)
world.addBody(J335)


//_____336
var geometry = new THREE.BoxGeometry(49.5, 5.01,49.5);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png'),
  
});
var j336 = new THREE.Mesh(geometry, material);
scene.add(j336);

const jamin336 = new CANNON.Box(new CANNON.Vec3(24.75, 2.7,24.75));
const J336 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(173,-0.6, -190)
})
J336.quaternion.setFromEuler(0,0,-0);
J336.addShape(jamin336)
world.addBody(J336)


//_____337
var geometry = new THREE.BoxGeometry(30, 5.02,30);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png'),
  
});
var j337 = new THREE.Mesh(geometry, material);
scene.add(j337);

const jamin337 = new CANNON.Box(new CANNON.Vec3(15, 2.7,15));
const J337 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(177.3,-0.6, -221)
})
J337.quaternion.setFromEuler(0,0.5,-0);
J337.addShape(jamin337)
world.addBody(J337)


//_____338
var geometry = new THREE.BoxGeometry(30.5, 5.0,30.5);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j338 = new THREE.Mesh(geometry, material);
scene.add(j338);

const jamin338 = new CANNON.Box(new CANNON.Vec3(15.25, 2.7,15.25));
const J338 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(177.3,-0.6, -221)
})
J338.quaternion.setFromEuler(0,0.5,-0);
J338.addShape(jamin338)
world.addBody(J338)


//_____339
var geometry = new THREE.BoxGeometry(30.5, 5.0,30.5);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j339 = new THREE.Mesh(geometry, material);
scene.add(j339);

const jamin339 = new CANNON.Box(new CANNON.Vec3(15.25, 2.7,15.25));
const J339 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(208,-0.6, -240)
})
J339.quaternion.setFromEuler(0,0.5,-0);
J339.addShape(jamin339)
world.addBody(J339)

//_____340
var geometry = new THREE.BoxGeometry(30, 5.02,30);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png'),
  
});
var j340 = new THREE.Mesh(geometry, material);
scene.add(j340);

const jamin340 = new CANNON.Box(new CANNON.Vec3(15, 2.7,15));
const J340 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(208,-0.6, -240)
})
J340.quaternion.setFromEuler(0,0.5,-0);
J340.addShape(jamin340)
world.addBody(J340)


//_____341
var geometry = new THREE.BoxGeometry(30.5, 5.01,30.5);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j341 = new THREE.Mesh(geometry, material);
scene.add(j341);

const jamin341 = new CANNON.Box(new CANNON.Vec3(15.25, 2.7,15.25));
const J341 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(208,-0.6, -263)
})
J341.quaternion.setFromEuler(0,0,-0);
J341.addShape(jamin341)
world.addBody(J341)


//_____342
var geometry = new THREE.BoxGeometry(30, 5.03,30);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png'),
  
});
var j342 = new THREE.Mesh(geometry, material);
scene.add(j342);

const jamin342 = new CANNON.Box(new CANNON.Vec3(15, 2.7,15));
const J342 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(208,-0.6, -263)
})
J342.quaternion.setFromEuler(0,0,-0);
J342.addShape(jamin342)
world.addBody(J342)



//_____343
var geometry = new THREE.BoxGeometry(30, 5.03,30);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png'),
  
});
var j343 = new THREE.Mesh(geometry, material);
scene.add(j343);

const jamin343 = new CANNON.Box(new CANNON.Vec3(15, 2.7,15));
const J343 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(219,-0.6, -206)
})
J343.quaternion.setFromEuler(0,0.1,-0);
J343.addShape(jamin343)
world.addBody(J343)

//_____344
var geometry = new THREE.BoxGeometry(30.5, 5.01,30.5);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j344 = new THREE.Mesh(geometry, material);
scene.add(j344);

const jamin344 = new CANNON.Box(new CANNON.Vec3(15.25, 2.7,15.25));
const J344 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(219,-0.6, -206)
})
J344.quaternion.setFromEuler(0,0.1,-0);
J344.addShape(jamin344)
world.addBody(J344)


//_____345
var geometry = new THREE.BoxGeometry(80, 5.01,80);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/images (11).jpeg'),
  
});
var j345 = new THREE.Mesh(geometry, material);
scene.add(j345);

const jamin345 = new CANNON.Box(new CANNON.Vec3(40, 2.7,40));
const J345 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(252.4,-0.6, -158.8)
})
J345.quaternion.setFromEuler(0,0.2,-0);
J345.addShape(jamin345)
world.addBody(J345)

//_____346
var geometry = new THREE.BoxGeometry(79.5, 5.02, 79.5);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png'),
  
});
var j346 = new THREE.Mesh(geometry, material);
scene.add(j346);

const jamin346 = new CANNON.Box(new CANNON.Vec3(39.75, 2.7,39.75));
const J346 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(252.4,-0.6, -158.8)
})
J346.quaternion.setFromEuler(0, 0.2, -0);
J346.addShape(jamin346)
world.addBody(J346)
//----------pl-------------

//_____347
var geometry = new THREE.BoxGeometry(15, 10.02,5);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (15).jpeg'),
  
});
var j347= new THREE.Mesh(geometry, material);
scene.add(j347);

const jamin347= new CANNON.Box(new CANNON.Vec3(7.5, 5.2,2.5));
const J347 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-156.9,-4,-140)
})
J347.quaternion.setFromEuler(0, -0, 0.1);
J347.addShape(jamin347)
world.addBody(J347)
//-----------------------

//_____348
var geometry = new THREE.BoxGeometry(15, 10.02, 5);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (15).jpeg'),
  
});
var j348 = new THREE.Mesh(geometry, material);
scene.add(j348);

const jamin348 = new CANNON.Box(new CANNON.Vec3(7.5, 5.2, 2.5));
const J348 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-170, -5.3, -138)
})
J348.quaternion.setFromEuler(0, 0.3, 0.1);
J348.addShape(jamin348)
world.addBody(J348)
//-----------------------

//_____349
var geometry = new THREE.BoxGeometry(15, 10.02, 5);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (15).jpeg'),
  
});
var j349 = new THREE.Mesh(geometry, material);
scene.add(j349);

const jamin349 = new CANNON.Box(new CANNON.Vec3(7.5, 5.2, 2.5));
const J349 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-178, -5.6, -134)
})
J349.quaternion.setFromEuler(0, 0.6, 0);
J349.addShape(jamin349)
world.addBody(J349)


//_____350
var geometry = new THREE.BoxGeometry(5, 10.01, 15);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (15).jpeg'),
  
});
var j350 = new THREE.Mesh(geometry, material);
scene.add(j350);

const jamin350 = new CANNON.Box(new CANNON.Vec3(2.5, 5.2, 7.5));
const J350 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-185.7, -5.6, -124.2)
})
J350.quaternion.setFromEuler(0, -0.4, 0);
J350.addShape(jamin350)
world.addBody(J350)

//_____351
var geometry = new THREE.BoxGeometry(5, 10.01, 15);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (15).jpeg'),
  
});
var j351 = new THREE.Mesh(geometry, material);
scene.add(j351);

const jamin351 = new CANNON.Box(new CANNON.Vec3(2.5, 5.2, 7.5));
const J351 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-191.2, -6.2, -111.4)
})
J351.quaternion.setFromEuler(0.1, -0.4, 0.05);
J351.addShape(jamin351)
world.addBody(J351)


//_____352
var geometry = new THREE.BoxGeometry(5, 10.01, 15);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (15).jpeg'),
  
});
var j352 = new THREE.Mesh(geometry, material);
scene.add(j352);

const jamin352 = new CANNON.Box(new CANNON.Vec3(2.5, 5.2, 7.5));
const J352 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-196, -7.3, -100)
})
J352.quaternion.setFromEuler(0.1, -0.4, 0.05);
J352.addShape(jamin352)
world.addBody(J352)

//_____353
var geometry = new THREE.BoxGeometry(15, 10.01, 30);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (15).jpeg'),
  
});
var j353 = new THREE.Mesh(geometry, material);
scene.add(j353);

const jamin353 = new CANNON.Box(new CANNON.Vec3(7.5, 5.2,15));
const J353 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-199.5, -7.5, -105)
})
J353.quaternion.setFromEuler(0, -0.4, 0);
J353.addShape(jamin353)
world.addBody(J353)


//_____354
var geometry = new THREE.BoxGeometry(15, 10.02, 30);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (15).jpeg'),
  
});
var j354 = new THREE.Mesh(geometry, material);
scene.add(j354);

const jamin354 = new CANNON.Box(new CANNON.Vec3(7.5, 5.2,15));
const J354 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-189, -7.5, -130)
})
J354.quaternion.setFromEuler(0, -0.4, 0);
J354.addShape(jamin354)
world.addBody(J354)


//_____355
var geometry = new THREE.BoxGeometry(15, 10.01, 30);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (15).jpeg'),
  
});
var j355 = new THREE.Mesh(geometry, material);
scene.add(j355);

const jamin355 = new CANNON.Box(new CANNON.Vec3(7.5, 5.2,15));
const J355 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-193, -8, -138)
})
J355.quaternion.setFromEuler(0.1, -0.5, 0);
J355.addShape(jamin355)
world.addBody(J355)


//_____356
var geometry = new THREE.BoxGeometry(15, 10.01, 30);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (15).jpeg'),
  
});
var j356 = new THREE.Mesh(geometry, material);
scene.add(j356);

const jamin356 = new CANNON.Box(new CANNON.Vec3(7.5, 5.2,15));
const J356 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-204, -9, -116)
})
J356.quaternion.setFromEuler(0, -0.4, 0);
J356.addShape(jamin356)
world.addBody(J356)


//_____357
var geometry = new THREE.BoxGeometry(15, 10.01, 30);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (15).jpeg'),
  
});
var j357 = new THREE.Mesh(geometry, material);
scene.add(j357);

const jamin357 = new CANNON.Box(new CANNON.Vec3(7.5, 5.2,15));
const J357 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-215.4, -10.3, -89.6)
})
J357.quaternion.setFromEuler(0.1,-0.4, 0.04);
J357.addShape(jamin357)
world.addBody(J357)


//_____358
var geometry = new THREE.BoxGeometry(18, 10.01, 30);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (15).jpeg'),
  
});
var j358 = new THREE.Mesh(geometry, material);
scene.add(j358);

const jamin358 = new CANNON.Box(new CANNON.Vec3(9, 5.2,15));
const J358 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-219, -10.3, -97)
})
J358.quaternion.setFromEuler(-0,-0.4, 0);
J358.addShape(jamin358)
world.addBody(J358)


//_____359
var geometry = new THREE.BoxGeometry(18, 10.01, 30);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (15).jpeg'),
  
});
var j359 = new THREE.Mesh(geometry, material);
scene.add(j359);

const jamin359 = new CANNON.Box(new CANNON.Vec3(9, 5.2,15));
const J359 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-207.8, -11.6, -123.8)
})
J359.quaternion.setFromEuler(-0.1,-0.4, -0.04);
J359.addShape(jamin359)
world.addBody(J359)


//_____360
var geometry = new THREE.BoxGeometry(18, 10.01, 30);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (15).jpeg'),
  
});
var j360 = new THREE.Mesh(geometry, material);
scene.add(j360);

const jamin360 = new CANNON.Box(new CANNON.Vec3(9, 5.2,15));
const J360 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-215, -11.6, -128)
})
J360.quaternion.setFromEuler(-0,-0.4,0);
J360.addShape(jamin360)
world.addBody(J360)


//_____361
var geometry = new THREE.BoxGeometry(18, 10.01, 30);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (15).jpeg'),
  
});
var j361 = new THREE.Mesh(geometry, material);
scene.add(j361);

const jamin361 = new CANNON.Box(new CANNON.Vec3(9, 5.2,15));
const J361 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-226.5, -12.9, -101)
})
J361.quaternion.setFromEuler(0.1,-0.4,0.04);
J361.addShape(jamin361)
world.addBody(J361)


//_____362
var geometry = new THREE.BoxGeometry(18, 10.01, 30);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (15).jpeg'),
  
});
var j362 = new THREE.Mesh(geometry, material);
scene.add(j362);

const jamin362 = new CANNON.Box(new CANNON.Vec3(9, 5.2,15));
const J362 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-234, -12.9, -108)
})
J362.quaternion.setFromEuler(0,-0.4,0);
J362.addShape(jamin362)
world.addBody(J362)


//_____363
var geometry = new THREE.BoxGeometry(18, 10.01, 30);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (15).jpeg'),
  
});
var j363 = new THREE.Mesh(geometry, material);
scene.add(j363);

const jamin363 = new CANNON.Box(new CANNON.Vec3(9, 5.2,15));
const J363 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-222.6, -14.2, -134.9)
})
J363.quaternion.setFromEuler(-0.1,-0.4,-0.04);
J363.addShape(jamin363)
world.addBody(J363)

//_____364
var geometry = new THREE.BoxGeometry(18, 10.01, 30);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (15).jpeg'),
  
});
var j364 = new THREE.Mesh(geometry, material);
scene.add(j364);

const jamin364 = new CANNON.Box(new CANNON.Vec3(9, 5.2,15));
const J364 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-230, -14.2, -138)
})
J364.quaternion.setFromEuler(0,-0.4,0);
J364.addShape(jamin364)
world.addBody(J364)


//_____365
var geometry = new THREE.BoxGeometry(18, 10.01, 30);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (15).jpeg'),
  
});
var j365 = new THREE.Mesh(geometry, material);
scene.add(j365);

const jamin365 = new CANNON.Box(new CANNON.Vec3(9, 5.2,15));
const J365 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-242, -15.5, -111.5)
})
J365.quaternion.setFromEuler(0.1,-0.4,0.04);
J365.addShape(jamin365)
world.addBody(J365)


//_____366
var geometry = new THREE.BoxGeometry(200, 10.01,200);
var material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png'),
  
});
var j366 = new THREE.Mesh(geometry, material);
scene.add(j366);

const jamin366 = new CANNON.Box(new CANNON.Vec3(100, 5.2,100));
const J366 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-250, -16, -111.5)
})
J366.quaternion.setFromEuler(0,0,0);
J366.addShape(jamin366)
world.addBody(J366)


//_________367
var geometry = new THREE.BoxGeometry(50, 3.03,25);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg')

});
var j367= new THREE.Mesh(geometry, material);
scene.add(j367);

const jamin367= new CANNON.Box(new CANNON.Vec3(25, 1.7,12.5));
const J367 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-259,-11,-104)
})
J367.quaternion.setFromEuler(-0, 0.4, 0);
J367.addShape(jamin367)
world.addBody(J367)

//_________368
var geometry = new THREE.BoxGeometry(30, 3.01, 30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg')

});
var j368= new THREE.Mesh(geometry, material);
scene.add(j368);

const jamin368 = new CANNON.Box(new CANNON.Vec3(15, 1.7,15));
const J368 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-293,-11.1,-89.7)
})
J368.quaternion.setFromEuler(-0, 0.4, 0);
J368.addShape(jamin368)
world.addBody(J368)


//_________369
var geometry = new THREE.BoxGeometry(50, 3.1,50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (1).jpeg')

});
var j369 = new THREE.Mesh(geometry, material);
scene.add(j369);

const jamin369 = new CANNON.Box(new CANNON.Vec3(25, 1.7,25));
const J369 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-327,-10.9,-107)
})
J369.quaternion.setFromEuler(-0, 0.4, 0);
J369.addShape(jamin369)
world.addBody(J369)


//_________370
var geometry = new THREE.BoxGeometry(10,5,10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (17).jpeg')

});
var j370 = new THREE.Mesh(geometry, material);
scene.add(j370);

const jamin370 = new CANNON.Box(new CANNON.Vec3(5,2.7,5));
const J370 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-317,-10.6,-112)
})
J370.quaternion.setFromEuler(-0.2, 0.4, 0);
J370.addShape(jamin370)
world.addBody(J370)

//_________371
var geometry = new THREE.BoxGeometry(39.1, 3, 39.1);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
  
});
var j371 = new THREE.Mesh(geometry, material);
scene.add(j371);

const jamin371 = new CANNON.Box(new CANNON.Vec3(19.5, 1.7, 19.5));
const J371 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-290, -11.02, -117)
})
J371.quaternion.setFromEuler(0, 0.4, 0);
J371.addShape(jamin371)
world.addBody(J371)


//_________372
var geometry = new THREE.BoxGeometry(10, 5, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (17).jpeg')
  
});
var j372 = new THREE.Mesh(geometry, material);
scene.add(j372);

const jamin372 = new CANNON.Box(new CANNON.Vec3(5, 2.7, 5));
const J372 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-330, -10.6, -112)
})
J372.quaternion.setFromEuler(0.2, 0.4, 0);
J372.addShape(jamin372)
world.addBody(J372)


//_________373
var geometry = new THREE.BoxGeometry(10, 5, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (17).jpeg')
  
});
var j373 = new THREE.Mesh(geometry, material);
scene.add(j373);

const jamin373 = new CANNON.Box(new CANNON.Vec3(5, 2.7, 5));
const J373 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-297, -10.6, -90)
})
J373.quaternion.setFromEuler(-0.2, 0.4, -0.2);
J373.addShape(jamin373)
world.addBody(J373)

//_________374
var geometry = new THREE.BoxGeometry(10, 5, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (17).jpeg')
  
});
var j374 = new THREE.Mesh(geometry, material);
scene.add(j374);

const jamin374 = new CANNON.Box(new CANNON.Vec3(5, 2.7, 5));
const J374 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-291, -10.6, -83)
})
J374.quaternion.setFromEuler(0.2,0, -0.3);
J374.addShape(jamin374)
world.addBody(J374)

//_________375
var geometry = new THREE.BoxGeometry(10, 5, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (17).jpeg')
  
});
var j375 = new THREE.Mesh(geometry, material);
scene.add(j375);

const jamin375 = new CANNON.Box(new CANNON.Vec3(5, 2.7, 5));
const J375 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-283, -11.5, -83)
})
J375.quaternion.setFromEuler(0,0, -0.2);
J375.addShape(jamin375)
world.addBody(J375)


//_________376
var geometry = new THREE.BoxGeometry(10, 5, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (17).jpeg')
  
});
var j376 = new THREE.Mesh(geometry, material);
scene.add(j376);

const jamin376 = new CANNON.Box(new CANNON.Vec3(5, 2.7, 5));
const J376 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-280, -11.5, -105)
})
J376.quaternion.setFromEuler(0,0.2, 0.2);
J376.addShape(jamin376)
world.addBody(J376)

//_________376
var geometry = new THREE.BoxGeometry(10, 5, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (17).jpeg')
  
});
var j377 = new THREE.Mesh(geometry, material);
scene.add(j377);

const jamin377 = new CANNON.Box(new CANNON.Vec3(5, 2.7, 5));
const J377 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-269, -11.5, -110)
})
J377.quaternion.setFromEuler(0,0.4, 0.2);
J377.addShape(jamin377)
world.addBody(J377)


//_________378
var geometry = new THREE.BoxGeometry(10, 5, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (17).jpeg')
  
});
var j378 = new THREE.Mesh(geometry, material);
scene.add(j378);

const jamin378 = new CANNON.Box(new CANNON.Vec3(5, 2.7, 5));
const J378 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-260, -11.5, -88)
})
J378.quaternion.setFromEuler(-0.2,0.4, 0.2);
J378.addShape(jamin378)
world.addBody(J378)

//_________379
var geometry = new THREE.BoxGeometry(10, 5, 10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/loadImg/images (17).jpeg')
  
});
var j379 = new THREE.Mesh(geometry, material);
scene.add(j379);

const jamin379 = new CANNON.Box(new CANNON.Vec3(5, 2.7, 5));
const J379 = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(-262, -11.5, -115)
})
J379.quaternion.setFromEuler(0.1,0.4,-0.2);
J379.addShape(jamin379)
world.addBody(J379)









//jaminA

//____________jangal_____________

//___1
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s1 = new THREE.Mesh(geometry, material);
scene.add(s1);

const S1 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(-97, -50, 80)
})
S1.quaternion.setFromEuler(-1.5, 1, 0)
world.addBody(S1)


//___2
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s2= new THREE.Mesh(geometry, material);
scene.add(s2);

const S2 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(-70, -55, 80)
})
S2.quaternion.setFromEuler(-1.5, 1, 0)
world.addBody(S2)



//___3
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s3 = new THREE.Mesh(geometry, material);
scene.add(s3);

const S3 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(-50, -60, 80)
})
S3.quaternion.setFromEuler(-1.5, 1, 0)
world.addBody(S3)

//___4
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s4 = new THREE.Mesh(geometry, material);
scene.add(s4);

const S4 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(-110, -60, 50)
})
S4.quaternion.setFromEuler(-1.5, 1, 0)
world.addBody(S4)


//___5
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s5 = new THREE.Mesh(geometry, material);
scene.add(s5);

const S5 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(-85, -60, -35)
})
S5.quaternion.setFromEuler(-1.5, 1, 0)
world.addBody(S5)


//___6
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s6 = new THREE.Mesh(geometry, material);
scene.add(s6);

const S6 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(-60, -55, -70)
})
S6.quaternion.setFromEuler(-1.5, 1, 0)
world.addBody(S6)


//___7
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s7 = new THREE.Mesh(geometry, material);
scene.add(s7);

const S7 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(-40, -60, -70)
})
S7.quaternion.setFromEuler(-1.5, 1, 0)
world.addBody(S7)


//___8
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s8 = new THREE.Mesh(geometry, material);
scene.add(s8);

const S8 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(-20, -65, -70)
})
S8.quaternion.setFromEuler(-1.5, 1, 0)
world.addBody(S8)


//___9
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s9 = new THREE.Mesh(geometry, material);
scene.add(s9);

const S9 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(70, -66, -5)
})
S9.quaternion.setFromEuler(-1.5, 1, 0)
world.addBody(S9)


//___10
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s10 = new THREE.Mesh(geometry, material);
scene.add(s10);

const S10 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(75, -64.5, 10)
})
S10.quaternion.setFromEuler(-1.5, 1, 0)
world.addBody(S10)


//___11
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s11 = new THREE.Mesh(geometry, material);
scene.add(s11);

const S11 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(74, -64, 20)
})
S11.quaternion.setFromEuler(-1.5, 1, 0)
world.addBody(S11)



//___12
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s12 = new THREE.Mesh(geometry, material);
scene.add(s12);

const S12 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(70, -65.8, 30)
})
S12.quaternion.setFromEuler(-1.5, 1, 0)
world.addBody(S12)



//___13
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s13 = new THREE.Mesh(geometry, material);
scene.add(s13);

const S13 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(70, -65.8, -33)
})
S13.quaternion.setFromEuler(-1.5, 1, 0)
world.addBody(S13)


//___14
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s14 = new THREE.Mesh(geometry, material);
scene.add(s14);

const S14 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(76, -65, -20)
})
S14.quaternion.setFromEuler(-1.5, 1, 0)
world.addBody(S14)


//___15
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s15 = new THREE.Mesh(geometry, material);
scene.add(s15);

const S15 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(76, -65, -50)
})
S15.quaternion.setFromEuler(-1.5, 1, 0)
world.addBody(S15)


//___16
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s16 = new THREE.Mesh(geometry, material);
scene.add(s16);

const S16 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(60, -64, -50)
})
S16.quaternion.setFromEuler(-1.5, 1, 0)
world.addBody(S16)

//___17
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s17 = new THREE.Mesh(geometry, material);
scene.add(s17);

const S17 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(31, -63, -60)
})
S17.quaternion.setFromEuler(-1.5, 1, 0)
world.addBody(S17)


//___18
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s18 = new THREE.Mesh(geometry, material);
scene.add(s18);

const S18 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(40, -60, -80)
})
S18.quaternion.setFromEuler(-1.5, 1, 0)
world.addBody(S18)

//___19
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s19 = new THREE.Mesh(geometry, material);
scene.add(s19);

const S19 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(70, -60, -100)
})
S19.quaternion.setFromEuler(-1.5, 1, 0)
world.addBody(S19)



//___20
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s20 = new THREE.Mesh(geometry, material);
scene.add(s20);

const S20 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(98, -64, -100)
})
S20.quaternion.setFromEuler(-1.5, 1, 0)
world.addBody(S20)


//___21
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s21 = new THREE.Mesh(geometry, material);
scene.add(s21);

const S21 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(125, -60, -130)
})
S21.quaternion.setFromEuler(-1.5, 1, 0)
world.addBody(S21)

//___22
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s22 = new THREE.Mesh(geometry, material);
scene.add(s22);

const S22 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(90, -64, -120)
})
S22.quaternion.setFromEuler(-1.5, 1, 0)
world.addBody(S22)


//___23
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s23 = new THREE.Mesh(geometry, material);
scene.add(s23);

const S23 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(80, -66, -143)
})
S23.quaternion.setFromEuler(-1.5, 1, 0)
world.addBody(S23)


//___24
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s24 = new THREE.Mesh(geometry, material);
scene.add(s24);

const S24 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(80, -66, -186)
})
S24.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S24)


//___25
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s25 = new THREE.Mesh(geometry, material);
scene.add(s25);

const S25 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(60, -65, -186)
})
S25.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S25)



//___26
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s26 = new THREE.Mesh(geometry, material);
scene.add(s26);

const S26 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(30, -64, -170)
})
S26.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S26)

//___27
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s27 = new THREE.Mesh(geometry, material);
scene.add(s27);

const S27 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(30, -62, -120)
})
S27.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S27)



//___28
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s28 = new THREE.Mesh(geometry, material);
scene.add(s28);

const S28 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(-130, -62, 108)
})
S28.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S28)


//___29
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s29 = new THREE.Mesh(geometry, material);
scene.add(s29);

const S29 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(-150, -62.5, 107.9)
})
S29.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S29)


//___30
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s30 = new THREE.Mesh(geometry, material);
scene.add(s30);

const S30 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(-165, -66, 117)
})
S30.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S30)


//___31
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s31 = new THREE.Mesh(geometry, material);
scene.add(s31);

const S31 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(-170, -66, 152)
})
S31.quaternion.setFromEuler(-1.5, 3, 0)
world.addBody(S31)


//___32
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s32 = new THREE.Mesh(geometry, material);
scene.add(s32);

const S32 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(-175, -66, 150.5)
})
S32.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S32)



//___33
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s33 = new THREE.Mesh(geometry, material);
scene.add(s33);

const S33 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(-195, -65, 145)
})
S33.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S33)


//___34
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s34 = new THREE.Mesh(geometry, material);
scene.add(s34);

const S34 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(-205, -64, 135)
})
S34.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S34)


//___35
var geometry = new THREE.SphereGeometry(30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s35 = new THREE.Mesh(geometry, material);
scene.add(s35);

const S35 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(30),
  position: new CANNON.Vec3(-182, -27,9)
})
S35.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S35)


//___36
var geometry = new THREE.SphereGeometry(30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s36 = new THREE.Mesh(geometry, material);
scene.add(s36);

const S36 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(30),
  position: new CANNON.Vec3(-200, -23, 5)
})
S36.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S36)



//___37
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s37 = new THREE.Mesh(geometry, material);
scene.add(s37);

const S37 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(-194, -63,-21)
})
S37.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S37)


//___38
var geometry = new THREE.SphereGeometry(30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s38 = new THREE.Mesh(geometry, material);
scene.add(s38);

const S38 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(30),
  position: new CANNON.Vec3(-177, -27,-3)
})
S38.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S38)




//___39
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s39 = new THREE.Mesh(geometry, material);
scene.add(s39);

const S39 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(-159, -64,14)
})
S39.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S39)


//___40
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s40 = new THREE.Mesh(geometry, material);
scene.add(s40);

const S40 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(-120, -60,-14)
})
S40.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S40)


//___41
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s41 = new THREE.Mesh(geometry, material);
scene.add(s41);

const S41 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(-130, -64,14)
})
S41.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S41)



//___42
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s42 = new THREE.Mesh(geometry, material);
scene.add(s42);

const S42 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(-211, -64, 30)
})
S42.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S42)

//----_------_-----_--------_---
//___43
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s43 = new THREE.Mesh(geometry, material);
scene.add(s43);

const S43 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(198, -64, -20)
})
S43.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S43)


//___44
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s44 = new THREE.Mesh(geometry, material);
scene.add(s44);

const S44 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(190, -62, 0)
})
S44.quaternion.setFromEuler(-1.5, 0.2, 0)
world.addBody(S44)


//___45
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s45 = new THREE.Mesh(geometry, material);
scene.add(s45);

const S45 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(150, -60, 0)
})
S45.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S45)


//___46
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s46 = new THREE.Mesh(geometry, material);
scene.add(s46);

const S46 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(140, -60, 10)
})
S46.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S46)

//___47
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s47 = new THREE.Mesh(geometry, material);
scene.add(s47);

const S47 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(120, -60, 20)
})
S47.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S47)


//___48
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s48 = new THREE.Mesh(geometry, material);
scene.add(s48);

const S48 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(180, -64, 20)
})
S48.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S48)

//___49
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s49 = new THREE.Mesh(geometry, material);
scene.add(s49);

const S49 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(180, -64, 75)
})
S49.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S49)


//___50
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png'),
  color:'yellow'
});
var s50 = new THREE.Mesh(geometry, material);
scene.add(s50);

const S50 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(150, -63.5, 74.8)
})
S50.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S50)


//___51
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s51 = new THREE.Mesh(geometry, material);
scene.add(s51);

const S51 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(138, -63.5, 74.6)
})
S51.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S51)

//___52
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (8).jpeg')
});
var s52 = new THREE.Mesh(geometry, material);
scene.add(s52);

const S52 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(135.5, -64, 74.6)
})
S52.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S52)

//___53
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (8).jpeg')
});
var s53 = new THREE.Mesh(geometry, material);
scene.add(s53);

const S53 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(130, -65, 80)
})
S53.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S53)


//___54
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s54 = new THREE.Mesh(geometry, material);
scene.add(s54);

const S54 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(104, -65, 50)
})
S54.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S54)


//___55
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s55 = new THREE.Mesh(geometry, material);
scene.add(s55);

const S55 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(70),
  position: new CANNON.Vec3(90, -64, 57)
})
S55.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S55)


//___56
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s56 = new THREE.Mesh(geometry, material);
scene.add(s56);

const S56 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50),
  position: new CANNON.Vec3(3, -44.5, 80)
})
S56.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S56)


//___57
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s57 = new THREE.Mesh(geometry, material);
scene.add(s57);

const S57 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50),
  position: new CANNON.Vec3(30, -44.6, 81)
})
S57.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S57)

//___58
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s58 = new THREE.Mesh(geometry, material);
scene.add(s58);

const S58 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50),
  position: new CANNON.Vec3(50, -44.6, 81)
})
S58.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S58)


//___59
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s59 = new THREE.Mesh(geometry, material);
scene.add(s59);

const S59 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50),
  position: new CANNON.Vec3(55, -45, 81)
})
S59.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S59)


//___60
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s60 = new THREE.Mesh(geometry, material);
scene.add(s60);

const S60 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50),
  position: new CANNON.Vec3(55, -44.7, 90)
})
S60.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S60)


//___61
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s61 = new THREE.Mesh(geometry, material);
scene.add(s61);

const S61 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50),
  position: new CANNON.Vec3(73, -44, 99)
})
S61.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S61)

//___62
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s62 = new THREE.Mesh(geometry, material);
scene.add(s62);

const S62 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50),
  position: new CANNON.Vec3(85, -43, 103)
})
S62.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S62)



//___63
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s63 = new THREE.Mesh(geometry, material);
scene.add(s63);

const S63 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50),
  position: new CANNON.Vec3(85, -42, 115)
})
S63.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S63)



//___64
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s64 = new THREE.Mesh(geometry, material);
scene.add(s64);

const S64 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50),
  position: new CANNON.Vec3(85, -42, 135)
})
S64.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S64)


//___65
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s65 = new THREE.Mesh(geometry, material);
scene.add(s65);

const S65 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50),
  position: new CANNON.Vec3(85, -40.7, 145)
})
S65.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S65)



//___66
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s66 = new THREE.Mesh(geometry, material);
scene.add(s66);

const S66 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50),
  position: new CANNON.Vec3(110, -40.7, 145)
})
S66.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S66)

//___67
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s67 = new THREE.Mesh(geometry, material);
scene.add(s67);

const S67 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50),
  position: new CANNON.Vec3(70, -41.9, 145)
})
S67.quaternion.setFromEuler(-1.5, 0, 0)
world.addBody(S67)



//___68
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass_dirt.png')
});
var s68 = new THREE.Mesh(geometry, material);
scene.add(s68);

const S68 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50),
  position: new CANNON.Vec3(60, -41.9, 158)
})
S68.quaternion.setFromEuler(-1.3, 0, 0)
world.addBody(S68)


//___69
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s69 = new THREE.Mesh(geometry, material);
scene.add(s69);

const S69 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50),
  position: new CANNON.Vec3(50, -41.9, 160)
})
S69.quaternion.setFromEuler(-1.3, 0, 0)
world.addBody(S69)



//___70
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s70 = new THREE.Mesh(geometry, material);
scene.add(s70);

const S70 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50),
  position: new CANNON.Vec3(40, -43.5, 175)
})
S70.quaternion.setFromEuler(-1.6, 0, 0)
world.addBody(S70)



//___71
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s71 = new THREE.Mesh(geometry, material);
scene.add(s71);

const S71 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50),
  position: new CANNON.Vec3(20, -41.9, 170)
})
S71.quaternion.setFromEuler(-1.6, 0, 0)
world.addBody(S71)


//___72
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s72 = new THREE.Mesh(geometry, material);
scene.add(s72);

const S72 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50),
  position: new CANNON.Vec3(-10, -44, 170)
})
S72.quaternion.setFromEuler(-1.6, 0, 0)
world.addBody(S72)



//___73
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s73 = new THREE.Mesh(geometry, material);
scene.add(s73);

const S73 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50),
  position: new CANNON.Vec3(-30, -43, 150)
})
S73.quaternion.setFromEuler(-1.6, 0, 0)
world.addBody(S73)


//___74
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s74= new THREE.Mesh(geometry, material);
scene.add(s74);

const S74 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50),
  position: new CANNON.Vec3(-33, -42, 136.3)
})
S74.quaternion.setFromEuler(-1.6, 0, 0)
world.addBody(S74)


//___75
var geometry = new THREE.SphereGeometry(100);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var s75 = new THREE.Mesh(geometry, material);
scene.add(s75);

const S75 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(100),
  position: new CANNON.Vec3(33,-84, 210)
})
S75.quaternion.setFromEuler(-1.6, 0, 0)
world.addBody(S75)



//___76
var geometry = new THREE.SphereGeometry(100);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (12).jpeg')
});
var s76 = new THREE.Mesh(geometry, material);
scene.add(s76);

const S76 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(100),
  position: new CANNON.Vec3(80, -87, 210)
})
S76.quaternion.setFromEuler(-1.6, 0, 0)
world.addBody(S76)


//___77
var geometry = new THREE.SphereGeometry(10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s77 = new THREE.Mesh(geometry, material);
scene.add(s77);

const S77 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(10.2),
  position: new CANNON.Vec3(-5, -6, 118.5)
})
S77.quaternion.setFromEuler(-1.6, 0, 0)
world.addBody(S77)


//___78
var geometry = new THREE.SphereGeometry(10);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s78 = new THREE.Mesh(geometry, material);
scene.add(s78);

const S78 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(10.2),
  position: new CANNON.Vec3(0, -6.9, 117)
})
S78.quaternion.setFromEuler(-1.6, 0, 0)
world.addBody(S78)


//___79
var geometry = new THREE.SphereGeometry(15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s79 = new THREE.Mesh(geometry, material);
scene.add(s79);

const S79 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(15.2),
  position: new CANNON.Vec3(14,-11.6, 117.5)
})
S79.quaternion.setFromEuler(-1.6, 0, 0)
world.addBody(S79)


//___80
var geometry = new THREE.SphereGeometry(15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s80 = new THREE.Mesh(geometry, material);
scene.add(s80);

const S80 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(15.2),
  position: new CANNON.Vec3(30,-11.6, 118)
})
S80.quaternion.setFromEuler(-1.6, 0, 0)
world.addBody(S80)


//___81
var geometry = new THREE.SphereGeometry(15);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
  
});
var s81 = new THREE.Mesh(geometry, material);
scene.add(s81);

const S81 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(15.2),
  position: new CANNON.Vec3(38,-12, 118)
})
S81.quaternion.setFromEuler(-1.6, 0, 0)
world.addBody(S81)



//___82
var geometry = new THREE.SphereGeometry(20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/dirt.png')

});
var s82 = new THREE.Mesh(geometry, material);
scene.add(s82);

const S82 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(20.2),
  position: new CANNON.Vec3(-68,-17, -180)
})
S82.quaternion.setFromEuler(-1.6, 0, 0)
world.addBody(S82)


//___83
var geometry = new THREE.SphereGeometry(20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
  
});
var s83 = new THREE.Mesh(geometry, material);
scene.add(s83);

const S83 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(20.2),
  position: new CANNON.Vec3(-68,-14, -195)
})
S83.quaternion.setFromEuler(-1.6, 0, 0)
world.addBody(S83)


//___84
var geometry = new THREE.SphereGeometry(20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
  
});
var s84 = new THREE.Mesh(geometry, material);
scene.add(s84);

const S84 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(20.2),
  position: new CANNON.Vec3(-80,-14.8, -187)
})
S84.quaternion.setFromEuler(-1.6, 0, 0)
world.addBody(S84)


//___85
var geometry = new THREE.SphereGeometry(20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/dirt.png')
});
var s85 = new THREE.Mesh(geometry, material);
scene.add(s85);

const S85 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(20.2),
  position: new CANNON.Vec3(-60,-15.5, -187)
})
S85.quaternion.setFromEuler(-1.6, 0, 0)
world.addBody(S85)


//___86
var geometry = new THREE.SphereGeometry(20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
  
});
var s86 = new THREE.Mesh(geometry, material);
scene.add(s86);

const S86 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(20.2),
  position: new CANNON.Vec3(-50,-15.3, -190)
})
S86.quaternion.setFromEuler(-1.6, 0, 0)
world.addBody(S86)


//___87
var geometry = new THREE.SphereGeometry(20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/dirt.png')
});
var s87 = new THREE.Mesh(geometry, material);
scene.add(s87);

const S87 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(20.2),
  position: new CANNON.Vec3(-60,-17, -180)
})
S87.quaternion.setFromEuler(-1.6, 0, 0)
world.addBody(S87)

//___88
var geometry = new THREE.SphereGeometry(20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/dirt.png')

});
var s88 = new THREE.Mesh(geometry, material);
scene.add(s88);

const S88 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(20.2),
  position: new CANNON.Vec3(-50,-17, -183)
})
S88.quaternion.setFromEuler(-1.6, 0, 0)
world.addBody(S88)



//___89
var geometry = new THREE.SphereGeometry(20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/dirt.png')
});
var s89 = new THREE.Mesh(geometry, material);
scene.add(s89);

const S89 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(20.2),
  position: new CANNON.Vec3(-40,-15, -183)
})
S89.quaternion.setFromEuler(-1.6, 0, 0)
world.addBody(S89)


//___90
var geometry = new THREE.SphereGeometry(20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/dirt.png')
});
var s90 = new THREE.Mesh(geometry, material);
scene.add(s90);

const S90 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(20.2),
  position: new CANNON.Vec3(-120,-17.5, -178.4)
})
S90.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S90)


//___91
var geometry = new THREE.SphereGeometry(20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/dirt.png')
});
var s91 = new THREE.Mesh(geometry, material);
scene.add(s91);

const S91 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(20.2),
  position: new CANNON.Vec3(-120,-15.5, -187)
})
S91.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S91)



//___92
var geometry = new THREE.SphereGeometry(20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/dirt.png')
});
var s92 = new THREE.Mesh(geometry, material);
scene.add(s92);

const S92 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(20.2),
  position: new CANNON.Vec3(-130,-15, -187.6)
})
S92.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S92)


//___93
var geometry = new THREE.SphereGeometry(20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/dirt.png')
});
var s93 = new THREE.Mesh(geometry, material);
scene.add(s93);

const S93 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(20.2),
  position: new CANNON.Vec3(-143,-13, -187.6)
})
S93.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S93)



//___94
var geometry = new THREE.SphereGeometry(20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/dirt.png')
});
var s94 = new THREE.Mesh(geometry, material);
scene.add(s94);

const S94 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(20.2),
  position: new CANNON.Vec3(-143,-16, -178)
})
S94.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S94)



//___95
var geometry = new THREE.SphereGeometry(20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/dirt.png')
});
var s95 = new THREE.Mesh(geometry, material);
scene.add(s95);

const S95 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(20.2),
  position: new CANNON.Vec3(-136,-17, -178)
})
S95.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S95)


//___96
var geometry = new THREE.SphereGeometry(20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/dirt.png')
});
var s96 = new THREE.Mesh(geometry, material);
scene.add(s96);

const S96 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(20.2),
  position: new CANNON.Vec3(-108,-14, -193)
})
S96.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S96)


//___97
var geometry = new THREE.SphereGeometry(20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/dirt.png')
});
var s97 = new THREE.Mesh(geometry, material);
scene.add(s97);

const S97 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(20.2),
  position: new CANNON.Vec3(-97,-16, -190)
})
S97.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S97)


//___98
var geometry = new THREE.SphereGeometry(20);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/dirt.png')
});
var s98 = new THREE.Mesh(geometry, material);
scene.add(s98);

const S98 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(20.2),
  position: new CANNON.Vec3(-90,-14, -197)
})
S98.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S98)



//___99
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s99 = new THREE.Mesh(geometry, material);
scene.add(s99);

const S99 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(-174,-38, -180)
})
S99.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S99)



//___100
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s100 = new THREE.Mesh(geometry, material);
scene.add(s100);

const S100 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(-144,-40, -215)
})
S100.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S100)


//___101
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s101 = new THREE.Mesh(geometry, material);
scene.add(s101);

const S101 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(-120,-38, -215)
})
S101.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S101)


//___102
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s102 = new THREE.Mesh(geometry, material);
scene.add(s102);

const S102 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(-90,-40, -215)
})
S102.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S102)


//___103
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s103 = new THREE.Mesh(geometry, material);
scene.add(s103);

const S103 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(-70,-40, -215)
})
S103.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S103)



//___104
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s104 = new THREE.Mesh(geometry, material);
scene.add(s104);

const S104 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(-40,-42, -215)
})
S104.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S104)


//___105
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s105 = new THREE.Mesh(geometry, material);
scene.add(s105);

const S105 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(-20,-40, -200)
})
S105.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S105)


//___106
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s106 = new THREE.Mesh(geometry, material);
scene.add(s106);

const S106 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(5,-38, -200)
})
S106.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S106)


//___107
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s107 = new THREE.Mesh(geometry, material);
scene.add(s107);

const S107 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(5,-43, -180)
})
S107.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S107)


//___108
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s108 = new THREE.Mesh(geometry, material);
scene.add(s108);

const S108 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(5,-43, -155)
})
S108.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S108)


//___109
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s109 = new THREE.Mesh(geometry, material);
scene.add(s109);

const S109 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(-103, -43, -120)
})
S109.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S109)


//___110
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s110 = new THREE.Mesh(geometry, material);
scene.add(s110);

const S110 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(-97, -45, -145)
})
S110.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S110)

//___111
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s111 = new THREE.Mesh(geometry, material);
scene.add(s111);

const S111 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(-88, -46, -153)
})
S111.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S111)


//___112
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s112 = new THREE.Mesh(geometry, material);
scene.add(s112);

const S112 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(-110, -46, -100)
})
S112.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S112)
//------------jng---------
//___113
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s113 = new THREE.Mesh(geometry, material);
scene.add(s113);

const S113 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(258,-44, -90)
})
S113.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S113)

//___114
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s114 = new THREE.Mesh(geometry, material);
scene.add(s114);

const S114 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(258,-46, -115)
})
S114.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S114)


//___115
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s115 = new THREE.Mesh(geometry, material);
scene.add(s115);

const S115 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(255,-45, -130)
})
S115.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S115)


//___116
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s116 = new THREE.Mesh(geometry, material);
scene.add(s116);

const S116 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(250, -45, -135)
})
S116.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S116)


//___117
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s117 = new THREE.Mesh(geometry, material);
scene.add(s117);

const S117 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(238, -46, -135)
})
S117.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S117)


//___118
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s118 = new THREE.Mesh(geometry, material);
scene.add(s118);

const S118 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(229, -46.7, -135)
})
S118.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S118)


//___119
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s119 = new THREE.Mesh(geometry, material);
scene.add(s119);

const S119 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(230, -46.7, -125)
})
S119.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S119)

//___120
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s120 = new THREE.Mesh(geometry, material);
scene.add(s120);

const S120 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(190, -46, -108)
})
S120.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S120)


//___121
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s121 = new THREE.Mesh(geometry, material);
scene.add(s121);

const S121 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(190, -46, -115)
})
S121.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S121)


//___122
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s122 = new THREE.Mesh(geometry, material);
scene.add(s122);

const S122 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(190, -46, -120)
})
S122.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S122)

//___123
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s123 = new THREE.Mesh(geometry, material);
scene.add(s123);

const S123 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(180, -45, -123)
})
S123.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S123)


//___124
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s124 = new THREE.Mesh(geometry, material);
scene.add(s124);

const S124 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(180, -45, -130)
})
S124.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S124)

//___125
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s125 = new THREE.Mesh(geometry, material);
scene.add(s125);

const S125 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(155, -45, -160)
})
S125.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S125)


//___126
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s126 = new THREE.Mesh(geometry, material);
scene.add(s126);

const S126 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(160, -44, -180)
})
S126.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S126)

//___127
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s127 = new THREE.Mesh(geometry, material);
scene.add(s127);

const S127 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(170, -44, -200)
})
S127.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S127)

//___128
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s128 = new THREE.Mesh(geometry, material);
scene.add(s128);

const S128 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(235, -44, -230)
})
S128.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S128)


//___129
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s129 = new THREE.Mesh(geometry, material);
scene.add(s129);

const S129 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(223, -44, -230)
})
S129.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S129)


//___130
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s130 = new THREE.Mesh(geometry, material);
scene.add(s130);

const S130 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(230, -45, -210)
})
S130.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S130)

//___131
var geometry = new THREE.SphereGeometry(50);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s131 = new THREE.Mesh(geometry, material);
scene.add(s131);

const S131 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(50.2),
  position: new CANNON.Vec3(230, -45, -240)
})
S131.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S131)


//___132
var geometry = new THREE.SphereGeometry(70);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s132 = new THREE.Mesh(geometry, material);
scene.add(s132);

const S132 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(35),
  position: new CANNON.Vec3(170, -50, -325)
})
S132.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S132)

//new jangal 
//___133
var geometry = new THREE.SphereGeometry(100);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s133 = new THREE.Mesh(geometry, material);
scene.add(s133);

const S133 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(100),
  position: new CANNON.Vec3(100, -65, -350)
})
S133.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S133)

//___134
var geometry = new THREE.SphereGeometry(80);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s134 = new THREE.Mesh(geometry, material);
scene.add(s134);

const S134 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(40),
  position: new CANNON.Vec3(240, -65, -315)
})
S134.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S134)

//___135
var geometry = new THREE.SphereGeometry(100);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/grass.png')
});
var s135 = new THREE.Mesh(geometry, material);
scene.add(s135);

const S135 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(100),
  position: new CANNON.Vec3(70, -70, -350)
})
S135.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S135)


//___136
var geometry = new THREE.SphereGeometry(130);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s136 = new THREE.Mesh(geometry, material);
scene.add(s136);

const S136 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(130),
  position: new CANNON.Vec3(-20, -100, -300)
})
S136.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S136)


//___137
var geometry = new THREE.SphereGeometry(130);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s137 = new THREE.Mesh(geometry, material);
scene.add(s137);

const S137 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(130),
  position: new CANNON.Vec3(-90, -120, -300)
})
S137.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S137)


//___138
var geometry = new THREE.SphereGeometry(130);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s138 = new THREE.Mesh(geometry, material);
scene.add(s138);

const S138 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(129.6),
  position: new CANNON.Vec3(-135, -130, -90)
})
S138.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S138)



//___139
var geometry = new THREE.SphereGeometry(130);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s139 = new THREE.Mesh(geometry, material);
scene.add(s139);

const S139 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(130),
  position: new CANNON.Vec3(-140, -130, -140)
})
S139.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S139)


//___140
var geometry = new THREE.SphereGeometry(130);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s140 = new THREE.Mesh(geometry, material);
scene.add(s140);

const S140 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(130),
  position: new CANNON.Vec3(-190, -140, -140)
})
S140.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S140)



//___141
var geometry = new THREE.SphereGeometry(130);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s141 = new THREE.Mesh(geometry, material);
scene.add(s141);

const S141 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(130),
  position: new CANNON.Vec3(-180, -135, -190)
})
S141.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S141)


//___142
var geometry = new THREE.SphereGeometry(130);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s142 = new THREE.Mesh(geometry, material);
scene.add(s142);

const S142 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(130),
  position: new CANNON.Vec3(-160, -130, -200)
})
S142.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S142)


//___143
var geometry = new THREE.SphereGeometry(30);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./img/images (14).jpeg')
});
var s143 = new THREE.Mesh(geometry, material);
scene.add(s143);

const S143 = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Sphere(30),
  position: new CANNON.Vec3(-170, -29, -150)
})
S143.quaternion.setFromEuler(-1.6, 0, 0.5)
world.addBody(S143)














//_____jangalA





//______________________________
const loader = new GLTFLoader();









// grassmodel ____________________



//_____________

loader.load("./barnHouse/Cabin.glb",function(gltf){
const houseM1=gltf.scene;
houseM1.position.set(-275,-5.5,-110);
houseM1.scale.set(0.01,0.01,0.01)
houseM1.rotation.y = 3.6;
scene.add(houseM1);
});




loader.load("./barnHouse/Silo House.glb", function(gltf) {
  const houseM1 = gltf.scene;
  houseM1.position.set(-290,-10,-117);
houseM1.rotation.y = 0.4;
  houseM1.scale.set(1.5,2,1.5)
  scene.add(houseM1);
});



loader.load("./barnHouse/Cloud (1).glb", function(gltf) {
  const houseM1 = gltf.scene;
houseM1.position.set(-300,-10.6,-98);
houseM1.rotation.y = 3.1;
houseM1.scale.set(2.8, 3.5,4.8);
houseM1.traverse((child) => {
  if (child.isMesh) {
    child.material = new THREE.MeshStandardMaterial({ map:new THREE.TextureLoader().load('./img/images (11).jpeg')});
  }
});  
  
scene.add(houseM1);
});
/*
chassisBody.position.set(100,5,-192)
*/
loader.load("./barnHouse/House.glb", function(gltf) {
  const houseM1 = gltf.scene;
  houseM1.position.set(97,4,-180);
  houseM1.rotation.y =1.6;
  houseM1.scale.set(1.8, 1.5,1.8)
  scene.add(houseM1);
});




loader.load("./barnHouse/House.glb", function(gltf) {
  const houseM1 = gltf.scene;
  houseM1.position.set(96,4,-225);
  houseM1.rotation.y =0;
  houseM1.scale.set(1.8, 1.5,1.8)
  scene.add(houseM1);
});







loader.load("./barnHouse/House.glb", function(gltf) {
  const houseM1 = gltf.scene;
  houseM1.position.set(180,4,-55);
  houseM1.rotation.y =3.2;
  houseM1.scale.set(1.8, 1.5,1.8)
  scene.add(houseM1);
});


loader.load("./house/Cottage.glb", function(gltf) {
  const houseM1 = gltf.scene;
  houseM1.position.set(200,2.5,-60);
  houseM1.rotation.y =3.2;
  houseM1.scale.set(40,40,40)
  scene.add(houseM1);
});





























//houseA1


//treeB

loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-304,-10,-94);
  tree1.scale.set(2, 2, 2)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-301,-10,-95);
  tree1.scale.set(2, 3, 2)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});


loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-302,-10,-113);
  tree1.scale.set(2, 2, 2)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-270, -10, -107);
  tree1.scale.set(1, 2, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});




/*

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(28, 0.5, 65);
  tree1.scale.set(2, 3, 2)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(32, 0.5, 65);
  tree1.scale.set(2, 2, 2)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});
loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(32, 0.5,71);
  tree1.scale.set(2, 2, 2)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});


loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(45, 0.5,87);
  tree1.scale.set(2, 4, 2)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});


loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(40, 0.5, 73);
  tree1.scale.set(2, 3, 2)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(45, 0.5, 65);
  tree1.scale.set(2,2, 2)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});


loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(48, 0.5, 70);
  tree1.scale.set(2,4, 2)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});
loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(50, 0.5, 65);
  tree1.scale.set(2,3, 2)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(55, 2, 87);
  tree1.scale.set(2,2, 2)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(58, 0.5, 63);
  tree1.scale.set(1,3, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(58, 0.5,48);
  tree1.scale.set(1, 3, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(58, 0.5, 45);
  tree1.scale.set(2, 4, 2)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});


loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(53, 0.5, 45);
  tree1.scale.set(2, 4, 2)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(56, 0.5, 30);
  tree1.scale.set(2, 4, 2)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(56, 0.5, 35);
  tree1.scale.set(2, 3, 2)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});


loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(56, 0.5, 35);
  tree1.scale.set(2, 3, 2)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});


loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(56, 0.5,29);
  tree1.scale.set(1, 2, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(56, 0.5,26);
  tree1.scale.set(1, 2, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(56, 0.5,24);
  tree1.scale.set(1, 3, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(56, 0.5,20);
  tree1.scale.set(2, 4, 2)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(0,5,83);
  tree1.scale.set(1, 2, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-8,4,86);
  tree1.scale.set(1, 1.5, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-10,1,83);
  tree1.scale.set(1, 2, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});
loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-8,4,90);
  tree1.scale.set(1, 2, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-6,2,97);
  tree1.scale.set(1, 2, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(65, 2,7);
  tree1.scale.set(1, 3, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(65, 2,13);
  tree1.scale.set(1, 3, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-8,3.7,120);
  tree1.scale.set(1, 2, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(15,3,121);
  tree1.scale.set(1, 2, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(75, 2, 13);
  tree1.scale.set(1, 3, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(38,3,120);
  tree1.scale.set(1, 1, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(42,2,120);
  tree1.scale.set(0.5,1,0.5)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(70,3,120);
  tree1.scale.set(2, 4, 2)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(80,3,130);
  tree1.scale.set(2, 3, 2)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(78,3,120);
  tree1.scale.set(2, 3, 2)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});




loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(90, 3, 70);
  tree1.scale.set(2, 3, 2)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});


loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(90, 3,50);
  tree1.scale.set(2, 2, 2)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});


loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(130,7,30);
  tree1.scale.set(1, 2, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(120, 7, 20);
  tree1.scale.set(2, 3, 2)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(150, 7,25);
  tree1.scale.set(1, 2, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(160,7,15);
  tree1.scale.set(1, 2, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(170,5,10);
  tree1.scale.set(2, 2, 2)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(180,4,25);
  tree1.scale.set(1, 2, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(195,4,25);
  tree1.scale.set(2, 2, 2)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(195,4,17);
  tree1.scale.set(2, 3, 2)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(197,4,-5);
  tree1.scale.set(1, 2, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(192,4,-15);
  tree1.scale.set(1, 2, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(210,4,-15);
  tree1.scale.set(1, 2, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});


loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(210,4,5);
  tree1.scale.set(1, 2, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-9, 2, -54);
  tree1.scale.set(1, 1, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-6, 2, -54);
  tree1.scale.set(1, 1, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-6, 2, -51);
  tree1.scale.set(1, 1, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});
loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-6, 2, -54);
  tree1.scale.set(1, 2, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});


loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-50, 2, -20);
  tree1.scale.set(1, 2, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});

loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-50, 2, -17);
  tree1.scale.set(1, 2, 1)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});




loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(90, 4, -100);
  tree1.scale.set(2, 5, 3)
  tree1.rotation.y = -1.4;
  scene.add(tree1);
});


loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(87, 5, -99);
  tree1.scale.set(2, 3, 2)
  tree1.rotation.y = 1.6;
  scene.add(tree1);
});





loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(87, 5, -105);
  tree1.scale.set(2, 4, 3)
  tree1.rotation.y = 0;
  scene.add(tree1);
});

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(80, 4, -110);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});


loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(120, 5, -120);
  tree1.scale.set(2, 4, 3)
  tree1.rotation.y = 1.6;
  scene.add(tree1);
});

loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(105, 5, -120);
  tree1.scale.set(1, 1, 1)
  tree1.rotation.y = 1.6;
  scene.add(tree1);
});

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(103, 5, -123);
  tree1.scale.set(1, 2, 1)
  tree1.rotation.y = 1.6;
  scene.add(tree1);
});

loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(102, 4, -118);
  tree1.scale.set(0.5, 1, 0.5)
  tree1.rotation.y = 1.6;
  scene.add(tree1);
});

loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(103, 4.8, -116);
  tree1.scale.set(0.5, 1, 0.5)
  tree1.rotation.y = 1.6;
  scene.add(tree1);
});

loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(104, 4.8, -114);
  tree1.scale.set(0.5, 1, 0.5)
  tree1.rotation.y = 1.6;
  scene.add(tree1);
});

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(104, 4.8, -110);
  tree1.scale.set(0.5, 1, 0.5)
  tree1.rotation.y = 1.6;
  scene.add(tree1);
});

loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(104, 4.8, -100);
  tree1.scale.set(0.5, 1, 0.5)
  tree1.rotation.y = 1.6;
  scene.add(tree1);
});

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(103, 4.8, -98);
  tree1.scale.set(0.5, 1, 0.5)
  tree1.rotation.y = 1.6;
  scene.add(tree1);
});

loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(105, 4.8, -98);
  tree1.scale.set(0.5, 1, 0.5)
  tree1.rotation.y = 1.6;
  scene.add(tree1);
});



loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(105, 4.8, -103);
  tree1.scale.set(0.9, 1.5, 0.9)
  tree1.rotation.y = 1.6;
  scene.add(tree1);
});


loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(90, 4.8, -110);
  tree1.scale.set(0.9, 1.5, 0.9)
  tree1.rotation.y = 1.6;
  scene.add(tree1);
});


loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(90, 4.8, -115);
  tree1.scale.set(0.9, 1.5, 0.9)
  tree1.rotation.y = 1.6;
  scene.add(tree1);
});


loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(86, 4.8, -115);
  tree1.scale.set(0.9, 1.5, 0.9)
  tree1.rotation.y = 1.6;
  scene.add(tree1);
});

loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(95, 2.7, -153);
  tree1.scale.set(2, 3, 2)
  tree1.rotation.y = 0;
  scene.add(tree1);
});


//--_--------_--------_------_---


loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-80, 1, -120);
  tree1.scale.set(1, 3, 1)
  tree1.rotation.y = 0;
  scene.add(tree1);
});

loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-80, 1, -130);
  tree1.scale.set(1, 2, 1)
  tree1.rotation.y = 0;
  scene.add(tree1);
});

loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-90, 2, -130);
  tree1.scale.set(1, 2, 1)
  tree1.rotation.y = 0;
  scene.add(tree1);
});


loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-90, 3, -120);
  tree1.scale.set(1, 2, 1)
  tree1.rotation.y = 0;
  scene.add(tree1);
});

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-80, 3, -125);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-85, 3, -125);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});

loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-80, 3, -125);
  tree1.scale.set(0.8, 2, 0.8)
  tree1.rotation.y = 0;
  scene.add(tree1);
});


loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-80, 5, -100);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});


loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-95, 5, -96);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});

loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-130, 7, -0);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});

loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-133, 7, -0);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});

loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-138, 5, -0);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-138, 5, 5);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});

loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-145, 5, 15);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});

loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-205, 5, 15);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});

loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-203, 5, 10);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-203, 5, -3);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-205, 5, -10);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});


loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-193, 5, -18);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});


loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-190, 5, -18);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-183, 5, -23);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-170, 5, 115);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});

loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-160, 5, 115);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});


loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-150, 5, 110);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});

loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-140, 5, 118);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});

loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-160, 2, 160);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});
loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-170, 2, 160);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});

loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-170, 2, 150);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-180, 2, 150);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});

loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-190, 2, 160);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});

loader.load("./tree/tree2.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-200, 2, 140);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});

loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-210, 2, 120);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});
loader.load("./tree/tree1.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-210, 2, 150);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});
loader.load("./tree/tree3.glb", function(gltf) {
  const tree1 = gltf.scene;
  tree1.position.set(-210, 2, 140);
  tree1.scale.set(4, 4, 4)
  tree1.rotation.y = 0;
  scene.add(tree1);
});
*/





//_______TreeA



//________road bit A________








//______________________________
//_________gehu raise....









//.    gehuA



//_______________________gltfloader__________________
//          village1

























let model,tire1,tire2,tire3,tire4,tire5;

const modelList = [
  './tire/truck/unloadTruck.glb',
];



const randomIndex = Math.floor(Math.random() * modelList.length);
const modelUrl = modelList[randomIndex];









loader.load(modelUrl,function(gltf){
    model =gltf.scene;
    model.scale.set(1.3,1.1,1);
    model.position.set(40, 4, -12);
    scene.add(model);
    loader.load("./tire/tireA.glb",function(gltf){
    tire1 =gltf.scene;
    tire1.scale.set(0.6,0.6,0.7);
    tire1.position.set(40, 4, -12);
    scene.add(tire1);
  loader.load("./tire/tireA.glb", function(gltf) {
  tire2 = gltf.scene;
  tire2.scale.set(0.6,0.6,0.7);
  tire2.position.set(40, 4, -12);
  scene.add(tire2);
  loader.load("./tire/tireA.glb", function(gltf) {
  tire3 = gltf.scene;
  tire3.scale.set(0.6,0.6,0.9);
  tire3.position.set(40, 4, -12);
  scene.add(tire3);
  loader.load("./tire/tireA.glb", function(gltf) {
  tire4 = gltf.scene;
  tire4.scale.set(0.6,0.6,0.9);
  tire4.position.set(40, 4, -12);
  scene.add(tire4);
  animate();
});
});
});
});

});


// arnal





//======cannone es code start===================
//  village1 code end...
//______________________________



//--------------------------------------------------------------
/*
const fullscreenIcon = document.getElementById('fullscreenIcon');

fullscreenIcon.addEventListener('pointerup', () => {

      if (renderer.domElement.requestFullscreen) {
        renderer.domElement.requestFullscreen();

      } else if (renderer.domElement.webkitRequestFullscreen) {
        renderer.domElement.webkitRequestFullscreen();
      } else if (renderer.domElement.msRequestFullscreen) {
        renderer.domElement.msRequestFullscreen();
}




});

*/

//cm
const clock = new THREE.Clock();




//mesh.add(camera)
meshCamera.add(camera)

renderer.setClearColor("lightblue");
 
 const controls = new OrbitControls( camera, renderer.domElement );
controls.maxPolarAngle = Math.PI * 0.495;
controls.enableDamping=true;
controls.dampingFactor = 0.05;


controls.minDistance = 10.0;
controls.maxDistance = 25.0;






// Cube 1 
const geometry1 = new THREE.BoxGeometry(1,1,2);
const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube1 = new THREE.Mesh(geometry1, material1);
//cube1.position.set(180.3, 3.1, -70);
cube1.position.set(130,3.2, -80);
scene.add(cube1);





let collided = false;

function checkCollision(obj1, obj2) {
  obj1.updateMatrixWorld();
  obj2.updateMatrixWorld();
  
  const box1 = new THREE.Box3().setFromObject(obj1);
  const box2 = new THREE.Box3().setFromObject(obj2);
  
  return box1.intersectsBox(box2);
}






//cameraB
camera.position.set(0,20,30);


function animate() {
    
 world.fixedStep();
//CannonD.update();
 controls.update(clock);
camera.lookAt(meshCamera.position);






requestAnimationFrame(animate);





if (!collided) {
  mesh.position.x -= 0.02;
  
  if (checkCollision(cube1,mesh)) {
    collided = true;
    console.log('Collision Detected!');

   window.location.href = "./game1.html"; // Ya window.open("https://example.com");
  }
}


//_______


cube1.rotation.y += 0.01;




mesh.position.copy(chassisBody.position)
mesh.quaternion.copy(chassisBody.quaternion)

meshCamera.position.copy(wheelBodyA1.position)
meshCamera.quaternion.copy(wheelBodyA1.quaternion)



model.position.copy(chassisBody.position)
model.quaternion.copy(chassisBody.quaternion)


//______________Sphere__________

j1.position.copy(J1.position)
j1.quaternion.copy(J1.quaternion)


j2.position.copy(J2.position)
j2.quaternion.copy(J2.quaternion)
/*
j3.position.copy(J3.position)
j3.quaternion.copy(J3.quaternion)

j4.position.copy(J4.position)
j4.quaternion.copy(J4.quaternion)

j5.position.copy(J5.position)
j5.quaternion.copy(J5.quaternion)
j6.position.copy(J6.position)
j6.quaternion.copy(J6.quaternion)

j7.position.copy(J7.position)
j7.quaternion.copy(J7.quaternion)

j8.position.copy(J8.position)
j8.quaternion.copy(J8.quaternion)

j9.position.copy(J9.position)
j9.quaternion.copy(J9.quaternion)

j10.position.copy(J10.position)
j10.quaternion.copy(J10.quaternion)

j11.position.copy(J11.position)
j11.quaternion.copy(J11.quaternion)

j12.position.copy(J12.position)
j12.quaternion.copy(J12.quaternion)
j13.position.copy(J13.position)
j13.quaternion.copy(J13.quaternion)
j14.position.copy(J14.position)
j14.quaternion.copy(J14.quaternion)

j15.position.copy(J15.position)
j15.quaternion.copy(J15.quaternion)

j16.position.copy(J16.position)
j16.quaternion.copy(J16.quaternion)

j17.position.copy(J17.position)
j17.quaternion.copy(J17.quaternion)

j18.position.copy(J18.position)
j18.quaternion.copy(J18.quaternion)

j19.position.copy(J19.position)
j19.quaternion.copy(J19.quaternion)

j20.position.copy(J20.position)
j20.quaternion.copy(J20.quaternion)
*/
j21.position.copy(J21.position)
j21.quaternion.copy(J21.quaternion)

j22.position.copy(J22.position)
j22.quaternion.copy(J22.quaternion)

j23.position.copy(J23.position)
j23.quaternion.copy(J23.quaternion)

j24.position.copy(J24.position)
j24.quaternion.copy(J24.quaternion)

j25.position.copy(J25.position)
j25.quaternion.copy(J25.quaternion)

j26.position.copy(J26.position)
j26.quaternion.copy(J26.quaternion)

j27.position.copy(J27.position)
j27.quaternion.copy(J27.quaternion)

j28.position.copy(J28.position)
j28.quaternion.copy(J28.quaternion)

j29.position.copy(J29.position)
j29.quaternion.copy(J29.quaternion)
j30.position.copy(J30.position)
j30.quaternion.copy(J30.quaternion)

j31.position.copy(J31.position)
j31.quaternion.copy(J31.quaternion)

j32.position.copy(J32.position)
j32.quaternion.copy(J32.quaternion)
j33.position.copy(J33.position)
j33.quaternion.copy(J33.quaternion)

j34.position.copy(J34.position)
j34.quaternion.copy(J34.quaternion)

j35.position.copy(J35.position)
j35.quaternion.copy(J35.quaternion)

j36.position.copy(J36.position)
j36.quaternion.copy(J36.quaternion)

j37.position.copy(J37.position)
j37.quaternion.copy(J37.quaternion)
j38.position.copy(J38.position)
j38.quaternion.copy(J38.quaternion)

j39.position.copy(J39.position)
j39.quaternion.copy(J39.quaternion)

j40.position.copy(J40.position)
j40.quaternion.copy(J40.quaternion)

j41.position.copy(J41.position)
j41.quaternion.copy(J41.quaternion)

j42.position.copy(J42.position)
j42.quaternion.copy(J42.quaternion)

j43.position.copy(J43.position)
j43.quaternion.copy(J43.quaternion)

j44.position.copy(J44.position)
j44.quaternion.copy(J44.quaternion)

j45.position.copy(J45.position)
j45.quaternion.copy(J45.quaternion)

j46.position.copy(J46.position)
j46.quaternion.copy(J46.quaternion)

j47.position.copy(J47.position)
j47.quaternion.copy(J47.quaternion)

j48.position.copy(J48.position)
j48.quaternion.copy(J48.quaternion)

j49.position.copy(J49.position)
j49.quaternion.copy(J49.quaternion)

j50.position.copy(J50.position)
j50.quaternion.copy(J50.quaternion)

j51.position.copy(J51.position)
j51.quaternion.copy(J51.quaternion)

j52.position.copy(J52.position)
j52.quaternion.copy(J52.quaternion)

j53.position.copy(J53.position)
j53.quaternion.copy(J53.quaternion)

j54.position.copy(J54.position)
j54.quaternion.copy(J54.quaternion)

j55.position.copy(J55.position)
j55.quaternion.copy(J55.quaternion)


j56.position.copy(J56.position)
j56.quaternion.copy(J56.quaternion)

j57.position.copy(J57.position)
j57.quaternion.copy(J57.quaternion)

j58.position.copy(J58.position)
j58.quaternion.copy(J58.quaternion)

j59.position.copy(J59.position)
j59.quaternion.copy(J59.quaternion)

j60.position.copy(J60.position)
j60.quaternion.copy(J60.quaternion)

j61.position.copy(J61.position)
j61.quaternion.copy(J61.quaternion)

j62.position.copy(J62.position)
j62.quaternion.copy(J62.quaternion)

j63.position.copy(J63.position)
j63.quaternion.copy(J63.quaternion)

j64.position.copy(J64.position)
j64.quaternion.copy(J64.quaternion)

j65.position.copy(J65.position)
j65.quaternion.copy(J65.quaternion)

j66.position.copy(J66.position)
j66.quaternion.copy(J66.quaternion)

/*
j67.position.copy(J67.position)
j67.quaternion.copy(J67.quaternion)

j68.position.copy(J68.position)
j68.quaternion.copy(J68.quaternion)

j69.position.copy(J69.position)
j69.quaternion.copy(J69.quaternion)

j70.position.copy(J70.position)
j70.quaternion.copy(J70.quaternion)

j71.position.copy(J71.position)
j71.quaternion.copy(J71.quaternion)

j72.position.copy(J72.position)
j72.quaternion.copy(J72.quaternion)
*/

j73.position.copy(J73.position)
j73.quaternion.copy(J73.quaternion)

j74.position.copy(J74.position)
j74.quaternion.copy(J74.quaternion)

j75.position.copy(J75.position)
j75.quaternion.copy(J75.quaternion)


j76.position.copy(J76.position)
j76.quaternion.copy(J76.quaternion)

j77.position.copy(J77.position)
j77.quaternion.copy(J77.quaternion)

j78.position.copy(J78.position)
j78.quaternion.copy(J78.quaternion)

j79.position.copy(J79.position)
j79.quaternion.copy(J79.quaternion)

j80.position.copy(J80.position)
j80.quaternion.copy(J80.quaternion)

j81.position.copy(J81.position)
j81.quaternion.copy(J81.quaternion)

j82.position.copy(J82.position)
j82.quaternion.copy(J82.quaternion)

j83.position.copy(J83.position)
j83.quaternion.copy(J83.quaternion)

j84.position.copy(J84.position)
j84.quaternion.copy(J84.quaternion)

j85.position.copy(J85.position)
j85.quaternion.copy(J85.quaternion)

j86.position.copy(J86.position)
j86.quaternion.copy(J86.quaternion)

j87.position.copy(J87.position)
j87.quaternion.copy(J87.quaternion)

j88.position.copy(J88.position)
j88.quaternion.copy(J88.quaternion)

j89.position.copy(J89.position)
j89.quaternion.copy(J89.quaternion)

j90.position.copy(J90.position)
j90.quaternion.copy(J90.quaternion)

j91.position.copy(J91.position)
j91.quaternion.copy(J91.quaternion)

j92.position.copy(J92.position)
j92.quaternion.copy(J92.quaternion)

j93.position.copy(J93.position)
j93.quaternion.copy(J93.quaternion)

j94.position.copy(J94.position)
j94.quaternion.copy(J94.quaternion)

j95.position.copy(J95.position)
j95.quaternion.copy(J95.quaternion)

j96.position.copy(J96.position)
j96.quaternion.copy(J96.quaternion)

j97.position.copy(J97.position)
j97.quaternion.copy(J97.quaternion)

j98.position.copy(J98.position)
j98.quaternion.copy(J98.quaternion)

j99.position.copy(J99.position)
j99.quaternion.copy(J99.quaternion)

j100.position.copy(J100.position)
j100.quaternion.copy(J100.quaternion)

j101.position.copy(J101.position)
j101.quaternion.copy(J101.quaternion)

j102.position.copy(J102.position)
j102.quaternion.copy(J102.quaternion)

j103.position.copy(J103.position)
j103.quaternion.copy(J103.quaternion)

j104.position.copy(J104.position)
j104.quaternion.copy(J104.quaternion)

j105.position.copy(J105.position)
j105.quaternion.copy(J105.quaternion)

j106.position.copy(J106.position)
j106.quaternion.copy(J106.quaternion)

j107.position.copy(J107.position)
j107.quaternion.copy(J107.quaternion)

j108.position.copy(J108.position)
j108.quaternion.copy(J108.quaternion)

j109.position.copy(J109.position)
j109.quaternion.copy(J109.quaternion)

j110.position.copy(J110.position)
j110.quaternion.copy(J110.quaternion)

j111.position.copy(J111.position)
j111.quaternion.copy(J111.quaternion)

j112.position.copy(J112.position)
j112.quaternion.copy(J112.quaternion)

j113.position.copy(J113.position)
j113.quaternion.copy(J113.quaternion)

j114.position.copy(J114.position)
j114.quaternion.copy(J114.quaternion)

j115.position.copy(J115.position)
j115.quaternion.copy(J115.quaternion)

j116.position.copy(J116.position)
j116.quaternion.copy(J116.quaternion)

j117.position.copy(J117.position)
j117.quaternion.copy(J117.quaternion)
j118.position.copy(J118.position)
j118.quaternion.copy(J118.quaternion)

j119.position.copy(J119.position)
j119.quaternion.copy(J119.quaternion)

j120.position.copy(J120.position)
j120.quaternion.copy(J120.quaternion)

j121.position.copy(J121.position)
j121.quaternion.copy(J121.quaternion)

j122.position.copy(J122.position)
j122.quaternion.copy(J122.quaternion)

j123.position.copy(J123.position)
j123.quaternion.copy(J123.quaternion)

j124.position.copy(J124.position)
j124.quaternion.copy(J124.quaternion)

j125.position.copy(J125.position)
j125.quaternion.copy(J125.quaternion)

j126.position.copy(J126.position)
j126.quaternion.copy(J126.quaternion)

j127.position.copy(J127.position)
j127.quaternion.copy(J127.quaternion)

j128.position.copy(J128.position)
j128.quaternion.copy(J128.quaternion)

j129.position.copy(J129.position)
j129.quaternion.copy(J129.quaternion)

j130.position.copy(J130.position)
j130.quaternion.copy(J130.quaternion)

j131.position.copy(J131.position)
j131.quaternion.copy(J131.quaternion)

j132.position.copy(J132.position)
j132.quaternion.copy(J132.quaternion)

j133.position.copy(J133.position)
j133.quaternion.copy(J133.quaternion)

j134.position.copy(J134.position)
j134.quaternion.copy(J134.quaternion)

j135.position.copy(J135.position)
j135.quaternion.copy(J135.quaternion)

j136.position.copy(J136.position)
j136.quaternion.copy(J136.quaternion)

j137.position.copy(J137.position)
j137.quaternion.copy(J137.quaternion)

j138.position.copy(J138.position)
j138.quaternion.copy(J138.quaternion)

j139.position.copy(J139.position)
j139.quaternion.copy(J139.quaternion)

j140.position.copy(J140.position)
j140.quaternion.copy(J140.quaternion)

j141.position.copy(J141.position)
j141.quaternion.copy(J141.quaternion)

j142.position.copy(J142.position)
j142.quaternion.copy(J142.quaternion)

j143.position.copy(J143.position)
j143.quaternion.copy(J143.quaternion)

j144.position.copy(J144.position)
j144.quaternion.copy(J144.quaternion)

j145.position.copy(J145.position)
j145.quaternion.copy(J145.quaternion)

j146.position.copy(J146.position)
j146.quaternion.copy(J146.quaternion)

j147.position.copy(J147.position)
j147.quaternion.copy(J147.quaternion)

j148.position.copy(J148.position)
j148.quaternion.copy(J148.quaternion)

j149.position.copy(J149.position)
j149.quaternion.copy(J149.quaternion)

j150.position.copy(J150.position)
j150.quaternion.copy(J150.quaternion)

j151.position.copy(J151.position)
j151.quaternion.copy(J151.quaternion)

j152.position.copy(J152.position)
j152.quaternion.copy(J152.quaternion)

j153.position.copy(J153.position)
j153.quaternion.copy(J153.quaternion)

j154.position.copy(J154.position)
j154.quaternion.copy(J154.quaternion)

j155.position.copy(J155.position)
j155.quaternion.copy(J155.quaternion)

j156.position.copy(J156.position)
j156.quaternion.copy(J156.quaternion)

j157.position.copy(J157.position)
j157.quaternion.copy(J157.quaternion)

j158.position.copy(J158.position)
j158.quaternion.copy(J158.quaternion)

j159.position.copy(J159.position)
j159.quaternion.copy(J159.quaternion)

j160.position.copy(J160.position)
j160.quaternion.copy(J160.quaternion)

j161.position.copy(J161.position)
j161.quaternion.copy(J161.quaternion)

j162.position.copy(J162.position)
j162.quaternion.copy(J162.quaternion)
j163.position.copy(J163.position)
j163.quaternion.copy(J163.quaternion)

j164.position.copy(J164.position)
j164.quaternion.copy(J164.quaternion)

j165.position.copy(J165.position)
j165.quaternion.copy(J165.quaternion)

j166.position.copy(J166.position)
j166.quaternion.copy(J166.quaternion)

j167.position.copy(J167.position)
j167.quaternion.copy(J167.quaternion)

j168.position.copy(J168.position)
j168.quaternion.copy(J168.quaternion)

j169.position.copy(J169.position)
j169.quaternion.copy(J169.quaternion)

j170.position.copy(J170.position)
j170.quaternion.copy(J170.quaternion)

j171.position.copy(J171.position)
j171.quaternion.copy(J171.quaternion)

j172.position.copy(J172.position)
j172.quaternion.copy(J172.quaternion)

j173.position.copy(J173.position)
j173.quaternion.copy(J173.quaternion)

j174.position.copy(J174.position)
j174.quaternion.copy(J174.quaternion)

j175.position.copy(J175.position)
j175.quaternion.copy(J175.quaternion)

j176.position.copy(J176.position)
j176.quaternion.copy(J176.quaternion)
j177.position.copy(J177.position)
j177.quaternion.copy(J177.quaternion)

j178.position.copy(J178.position)
j178.quaternion.copy(J178.quaternion)

j179.position.copy(J179.position)
j179.quaternion.copy(J179.quaternion)

j180.position.copy(J180.position)
j180.quaternion.copy(J180.quaternion)

j181.position.copy(J181.position)
j181.quaternion.copy(J181.quaternion)

j182.position.copy(J182.position)
j182.quaternion.copy(J182.quaternion)

j183.position.copy(J183.position)
j183.quaternion.copy(J183.quaternion)

j184.position.copy(J184.position)
j184.quaternion.copy(J184.quaternion)

j185.position.copy(J185.position)
j185.quaternion.copy(J185.quaternion)

j186.position.copy(J186.position)
j186.quaternion.copy(J186.quaternion)

j187.position.copy(J187.position)
j187.quaternion.copy(J187.quaternion)

j188.position.copy(J188.position)
j188.quaternion.copy(J188.quaternion)


j189.position.copy(J189.position)
j189.quaternion.copy(J189.quaternion)

j190.position.copy(J190.position)
j190.quaternion.copy(J190.quaternion)

j191.position.copy(J191.position)
j191.quaternion.copy(J191.quaternion)
j192.position.copy(J192.position)
j192.quaternion.copy(J192.quaternion)

j193.position.copy(J193.position)
j193.quaternion.copy(J193.quaternion)

j194.position.copy(J194.position)
j194.quaternion.copy(J194.quaternion)

j195.position.copy(J195.position)
j195.quaternion.copy(J195.quaternion)

j196.position.copy(J196.position)
j196.quaternion.copy(J196.quaternion)

j197.position.copy(J197.position)
j197.quaternion.copy(J197.quaternion)
j198.position.copy(J198.position)
j198.quaternion.copy(J198.quaternion)

j199.position.copy(J199.position)
j199.quaternion.copy(J199.quaternion)

j200.position.copy(J200.position)
j200.quaternion.copy(J200.quaternion)

j201.position.copy(J201.position)
j201.quaternion.copy(J201.quaternion)

j202.position.copy(J202.position)
j202.quaternion.copy(J202.quaternion)


j203.position.copy(J203.position)
j203.quaternion.copy(J203.quaternion)

j204.position.copy(J204.position)
j204.quaternion.copy(J204.quaternion)


j205.position.copy(J205.position)
j205.quaternion.copy(J205.quaternion)

j206.position.copy(J206.position)
j206.quaternion.copy(J206.quaternion)

j207.position.copy(J207.position)
j207.quaternion.copy(J207.quaternion)

j208.position.copy(J208.position)
j208.quaternion.copy(J208.quaternion)

j209.position.copy(J209.position)
j209.quaternion.copy(J209.quaternion)

j210.position.copy(J210.position)
j210.quaternion.copy(J210.quaternion)

j211.position.copy(J211.position)
j211.quaternion.copy(J211.quaternion)


j212.position.copy(J212.position)
j212.quaternion.copy(J212.quaternion)

j213.position.copy(J213.position)
j213.quaternion.copy(J213.quaternion)


j214.position.copy(J214.position)
j214.quaternion.copy(J214.quaternion)
j215.position.copy(J215.position)
j215.quaternion.copy(J215.quaternion)

j216.position.copy(J216.position)
j216.quaternion.copy(J216.quaternion)

j217.position.copy(J217.position)
j217.quaternion.copy(J217.quaternion)

j218.position.copy(J218.position)
j218.quaternion.copy(J218.quaternion)

j219.position.copy(J219.position)
j219.quaternion.copy(J219.quaternion)

j220.position.copy(J220.position)
j220.quaternion.copy(J220.quaternion)

j221.position.copy(J221.position)
j221.quaternion.copy(J221.quaternion)


j222.position.copy(J222.position)
j222.quaternion.copy(J222.quaternion)

j223.position.copy(J223.position)
j223.quaternion.copy(J223.quaternion)

j224.position.copy(J224.position)
j224.quaternion.copy(J224.quaternion)

j225.position.copy(J225.position)
j225.quaternion.copy(J225.quaternion)

j226.position.copy(J226.position)
j226.quaternion.copy(J226.quaternion)

j227.position.copy(J227.position)
j227.quaternion.copy(J227.quaternion)

j228.position.copy(J228.position)
j228.quaternion.copy(J228.quaternion)

j229.position.copy(J229.position)
j229.quaternion.copy(J229.quaternion)

j230.position.copy(J230.position)
j230.quaternion.copy(J230.quaternion)

j231.position.copy(J231.position)
j231.quaternion.copy(J231.quaternion)

j232.position.copy(J232.position)
j232.quaternion.copy(J232.quaternion)

j233.position.copy(J233.position)
j233.quaternion.copy(J233.quaternion)

j234.position.copy(J234.position)
j234.quaternion.copy(J234.quaternion)

j235.position.copy(J235.position)
j235.quaternion.copy(J235.quaternion)


j236.position.copy(J236.position)
j236.quaternion.copy(J236.quaternion)

j237.position.copy(J237.position)
j237.quaternion.copy(J237.quaternion)


j238.position.copy(J238.position)
j238.quaternion.copy(J238.quaternion)

j239.position.copy(J239.position)
j239.quaternion.copy(J239.quaternion)

j240.position.copy(J240.position)
j240.quaternion.copy(J240.quaternion)

j241.position.copy(J241.position)
j241.quaternion.copy(J241.quaternion)

j242.position.copy(J242.position)
j242.quaternion.copy(J242.quaternion)


j243.position.copy(J243.position)
j243.quaternion.copy(J243.quaternion)


j244.position.copy(J244.position)
j244.quaternion.copy(J244.quaternion)

j245.position.copy(J245.position)
j245.quaternion.copy(J245.quaternion)

j246.position.copy(J246.position)
j246.quaternion.copy(J246.quaternion)

j247.position.copy(J247.position)
j247.quaternion.copy(J247.quaternion)

j248.position.copy(J248.position)
j248.quaternion.copy(J248.quaternion)

j249.position.copy(J249.position)
j249.quaternion.copy(J249.quaternion)

j250.position.copy(J250.position)
j250.quaternion.copy(J250.quaternion)

j251.position.copy(J251.position)
j251.quaternion.copy(J251.quaternion)

j252.position.copy(J252.position)
j252.quaternion.copy(J252.quaternion)

j253.position.copy(J253.position)
j253.quaternion.copy(J253.quaternion)

j254.position.copy(J254.position)
j254.quaternion.copy(J254.quaternion)

j255.position.copy(J255.position)
j255.quaternion.copy(J255.quaternion)

j256.position.copy(J256.position)
j256.quaternion.copy(J256.quaternion)

j257.position.copy(J257.position)
j257.quaternion.copy(J257.quaternion)

j258.position.copy(J258.position)
j258.quaternion.copy(J258.quaternion)

j259.position.copy(J259.position)
j259.quaternion.copy(J259.quaternion)

j260.position.copy(J260.position)
j260.quaternion.copy(J260.quaternion)

j261.position.copy(J261.position)
j261.quaternion.copy(J261.quaternion)

j262.position.copy(J262.position)
j262.quaternion.copy(J262.quaternion)

j263.position.copy(J263.position)
j263.quaternion.copy(J263.quaternion)


j264.position.copy(J264.position)
j264.quaternion.copy(J264.quaternion)

j265.position.copy(J265.position)
j265.quaternion.copy(J265.quaternion)

j266.position.copy(J266.position)
j266.quaternion.copy(J266.quaternion)

j267.position.copy(J267.position)
j267.quaternion.copy(J267.quaternion)

j268.position.copy(J268.position)
j268.quaternion.copy(J268.quaternion)

j269.position.copy(J269.position)
j269.quaternion.copy(J269.quaternion)

j270.position.copy(J270.position)
j270.quaternion.copy(J270.quaternion)

j271.position.copy(J271.position)
j271.quaternion.copy(J271.quaternion)

j272.position.copy(J272.position)
j272.quaternion.copy(J272.quaternion)

j273.position.copy(J273.position)
j273.quaternion.copy(J273.quaternion)
j274.position.copy(J274.position)
j274.quaternion.copy(J274.quaternion)

j275.position.copy(J275.position)
j275.quaternion.copy(J275.quaternion)


j276.position.copy(J276.position)
j276.quaternion.copy(J276.quaternion)

j277.position.copy(J277.position)
j277.quaternion.copy(J277.quaternion)

j278.position.copy(J278.position)
j278.quaternion.copy(J278.quaternion)

j279.position.copy(J279.position)
j279.quaternion.copy(J279.quaternion)

j280.position.copy(J280.position)
j280.quaternion.copy(J280.quaternion)

j281.position.copy(J281.position)
j281.quaternion.copy(J281.quaternion)

j282.position.copy(J282.position)
j282.quaternion.copy(J282.quaternion)

j283.position.copy(J283.position)
j283.quaternion.copy(J283.quaternion)

j284.position.copy(J284.position)
j284.quaternion.copy(J284.quaternion)

j285.position.copy(J285.position)
j285.quaternion.copy(J285.quaternion)

j286.position.copy(J286.position)
j286.quaternion.copy(J286.quaternion)

j287.position.copy(J287.position)
j287.quaternion.copy(J287.quaternion)

j288.position.copy(J288.position)
j288.quaternion.copy(J288.quaternion)

j289.position.copy(J289.position)
j289.quaternion.copy(J289.quaternion)

j290.position.copy(J290.position)
j290.quaternion.copy(J290.quaternion)

j291.position.copy(J291.position)
j291.quaternion.copy(J291.quaternion)

j292.position.copy(J292.position)
j292.quaternion.copy(J292.quaternion)

j293.position.copy(J293.position)
j293.quaternion.copy(J293.quaternion)

j294.position.copy(J294.position)
j294.quaternion.copy(J294.quaternion)

j295.position.copy(J295.position)
j295.quaternion.copy(J295.quaternion)

j296.position.copy(J296.position)
j296.quaternion.copy(J296.quaternion)

j297.position.copy(J297.position)
j297.quaternion.copy(J297.quaternion)

j298.position.copy(J298.position)
j298.quaternion.copy(J298.quaternion)

j299.position.copy(J299.position)
j299.quaternion.copy(J299.quaternion)

j300.position.copy(J300.position)
j300.quaternion.copy(J300.quaternion)

j301.position.copy(J301.position)
j301.quaternion.copy(J301.quaternion)

j302.position.copy(J302.position)
j302.quaternion.copy(J302.quaternion)


j303.position.copy(J303.position)
j303.quaternion.copy(J303.quaternion)

j304.position.copy(J304.position)
j304.quaternion.copy(J304.quaternion)

j305.position.copy(J305.position)
j305.quaternion.copy(J305.quaternion)

j306.position.copy(J306.position)
j306.quaternion.copy(J306.quaternion)

j307.position.copy(J307.position)
j307.quaternion.copy(J307.quaternion)

j308.position.copy(J308.position)
j308.quaternion.copy(J308.quaternion)

j309.position.copy(J309.position)
j309.quaternion.copy(J309.quaternion)

j310.position.copy(J310.position)
j310.quaternion.copy(J310.quaternion)

j311.position.copy(J311.position)
j311.quaternion.copy(J311.quaternion)


j312.position.copy(J312.position)
j312.quaternion.copy(J312.quaternion)

j313.position.copy(J313.position)
j313.quaternion.copy(J313.quaternion)

j314.position.copy(J314.position)
j314.quaternion.copy(J314.quaternion)

j315.position.copy(J315.position)
j315.quaternion.copy(J315.quaternion)

j316.position.copy(J316.position)
j316.quaternion.copy(J316.quaternion)


j317.position.copy(J317.position)
j317.quaternion.copy(J317.quaternion)

j318.position.copy(J318.position)
j318.quaternion.copy(J318.quaternion)

j319.position.copy(J319.position)
j319.quaternion.copy(J319.quaternion)

j320.position.copy(J320.position)
j320.quaternion.copy(J320.quaternion)

j321.position.copy(J321.position)
j321.quaternion.copy(J321.quaternion)

j322.position.copy(J322.position)
j322.quaternion.copy(J322.quaternion)

j323.position.copy(J323.position)
j323.quaternion.copy(J323.quaternion)

j324.position.copy(J324.position)
j324.quaternion.copy(J324.quaternion)

j325.position.copy(J325.position)
j325.quaternion.copy(J325.quaternion)

j326.position.copy(J326.position)
j326.quaternion.copy(J326.quaternion)

j327.position.copy(J327.position)
j327.quaternion.copy(J327.quaternion)

j328.position.copy(J328.position)
j328.quaternion.copy(J328.quaternion)

j329.position.copy(J329.position)
j329.quaternion.copy(J329.quaternion)


j330.position.copy(J330.position)
j330.quaternion.copy(J330.quaternion)

j331.position.copy(J331.position)
j331.quaternion.copy(J331.quaternion)

j332.position.copy(J332.position)
j332.quaternion.copy(J332.quaternion)

j333.position.copy(J333.position)
j333.quaternion.copy(J333.quaternion)

j334.position.copy(J334.position)
j334.quaternion.copy(J334.quaternion)

j335.position.copy(J335.position)
j335.quaternion.copy(J335.quaternion)

j336.position.copy(J336.position)
j336.quaternion.copy(J336.quaternion)

j337.position.copy(J337.position)
j337.quaternion.copy(J337.quaternion)

j338.position.copy(J338.position)
j338.quaternion.copy(J338.quaternion)

j339.position.copy(J339.position)
j339.quaternion.copy(J339.quaternion)

j340.position.copy(J340.position)
j340.quaternion.copy(J340.quaternion)

j341.position.copy(J341.position)
j341.quaternion.copy(J341.quaternion)

j342.position.copy(J342.position)
j342.quaternion.copy(J342.quaternion)

j343.position.copy(J343.position)
j343.quaternion.copy(J343.quaternion)

j344.position.copy(J344.position)
j344.quaternion.copy(J344.quaternion)

j345.position.copy(J345.position)
j345.quaternion.copy(J345.quaternion)

j346.position.copy(J346.position)
j346.quaternion.copy(J346.quaternion)

j347.position.copy(J347.position)
j347.quaternion.copy(J347.quaternion)

j348.position.copy(J348.position)
j348.quaternion.copy(J348.quaternion)

j349.position.copy(J349.position)
j349.quaternion.copy(J349.quaternion)

j350.position.copy(J350.position)
j350.quaternion.copy(J350.quaternion)

j351.position.copy(J351.position)
j351.quaternion.copy(J351.quaternion)

j352.position.copy(J352.position)
j352.quaternion.copy(J352.quaternion)

j353.position.copy(J353.position)
j353.quaternion.copy(J353.quaternion)


j354.position.copy(J354.position)
j354.quaternion.copy(J354.quaternion)

j355.position.copy(J355.position)
j355.quaternion.copy(J355.quaternion)

j356.position.copy(J356.position)
j356.quaternion.copy(J356.quaternion)

j357.position.copy(J357.position)
j357.quaternion.copy(J357.quaternion)

j358.position.copy(J358.position)
j358.quaternion.copy(J358.quaternion)

j359.position.copy(J359.position)
j359.quaternion.copy(J359.quaternion)

j360.position.copy(J360.position)
j360.quaternion.copy(J360.quaternion)

j361.position.copy(J361.position)
j361.quaternion.copy(J361.quaternion)

j362.position.copy(J362.position)
j362.quaternion.copy(J362.quaternion)

j363.position.copy(J363.position)
j363.quaternion.copy(J363.quaternion)

j364.position.copy(J364.position)
j364.quaternion.copy(J364.quaternion)

j365.position.copy(J365.position)
j365.quaternion.copy(J365.quaternion)

j366.position.copy(J366.position)
j366.quaternion.copy(J366.quaternion)

j367.position.copy(J367.position)
j367.quaternion.copy(J367.quaternion)

j368.position.copy(J368.position)
j368.quaternion.copy(J368.quaternion)

j369.position.copy(J369.position)
j369.quaternion.copy(J369.quaternion)

j370.position.copy(J370.position)
j370.quaternion.copy(J370.quaternion)
j371.position.copy(J371.position)
j371.quaternion.copy(J371.quaternion)

j372.position.copy(J372.position)
j372.quaternion.copy(J372.quaternion)

j373.position.copy(J373.position)
j373.quaternion.copy(J373.quaternion)

j374.position.copy(J374.position)
j374.quaternion.copy(J374.quaternion)

j375.position.copy(J375.position)
j375.quaternion.copy(J375.quaternion)

j376.position.copy(J376.position)
j376.quaternion.copy(J376.quaternion)

j377.position.copy(J377.position)
j377.quaternion.copy(J377.quaternion)

j378.position.copy(J378.position)
j378.quaternion.copy(J378.quaternion)

j379.position.copy(J379.position)
j379.quaternion.copy(J379.quaternion)







//jaminB
//_________________________
s1.position.copy(S1.position)
s1.quaternion.copy(S1.quaternion)

s2.position.copy(S2.position)
s2.quaternion.copy(S2.quaternion)

s3.position.copy(S3.position)
s3.quaternion.copy(S3.quaternion)

s4.position.copy(S4.position)
s4.quaternion.copy(S4.quaternion)

s5.position.copy(S5.position)
s5.quaternion.copy(S5.quaternion)

s6.position.copy(S6.position)
s6.quaternion.copy(S6.quaternion)

s7.position.copy(S7.position)
s7.quaternion.copy(S7.quaternion)

s8.position.copy(S8.position)
s8.quaternion.copy(S8.quaternion)

s9.position.copy(S9.position)
s9.quaternion.copy(S9.quaternion)


s10.position.copy(S10.position)
s10.quaternion.copy(S10.quaternion)

s11.position.copy(S11.position)
s11.quaternion.copy(S11.quaternion)

s12.position.copy(S12.position)
s12.quaternion.copy(S12.quaternion)

s13.position.copy(S13.position)
s13.quaternion.copy(S13.quaternion)

s14.position.copy(S14.position)
s14.quaternion.copy(S14.quaternion)

s15.position.copy(S15.position)
s15.quaternion.copy(S15.quaternion)


s16.position.copy(S16.position)
s16.quaternion.copy(S16.quaternion)

s17.position.copy(S17.position)
s17.quaternion.copy(S17.quaternion)

s18.position.copy(S18.position)
s18.quaternion.copy(S18.quaternion)


s19.position.copy(S19.position)
s19.quaternion.copy(S19.quaternion)
s20.position.copy(S20.position)
s20.quaternion.copy(S20.quaternion)

s21.position.copy(S21.position)
s21.quaternion.copy(S21.quaternion)

s22.position.copy(S22.position)
s22.quaternion.copy(S22.quaternion)

s23.position.copy(S23.position)
s23.quaternion.copy(S23.quaternion)

s24.position.copy(S24.position)
s24.quaternion.copy(S24.quaternion)

s25.position.copy(S25.position)
s25.quaternion.copy(S25.quaternion)


s26.position.copy(S26.position)
s26.quaternion.copy(S26.quaternion)

s27.position.copy(S27.position)
s27.quaternion.copy(S27.quaternion)

s28.position.copy(S28.position)
s28.quaternion.copy(S28.quaternion)

s29.position.copy(S29.position)
s29.quaternion.copy(S29.quaternion)

s30.position.copy(S30.position)
s30.quaternion.copy(S30.quaternion)

s31.position.copy(S31.position)
s31.quaternion.copy(S31.quaternion)

s32.position.copy(S32.position)
s32.quaternion.copy(S32.quaternion)

s33.position.copy(S33.position)
s33.quaternion.copy(S33.quaternion)

s34.position.copy(S34.position)
s34.quaternion.copy(S34.quaternion)

s35.position.copy(S35.position)
s35.quaternion.copy(S35.quaternion)

s36.position.copy(S36.position)
s36.quaternion.copy(S36.quaternion)

s37.position.copy(S37.position)
s37.quaternion.copy(S37.quaternion)

s38.position.copy(S38.position)
s38.quaternion.copy(S38.quaternion)

s39.position.copy(S39.position)
s39.quaternion.copy(S39.quaternion)

s40.position.copy(S40.position)
s40.quaternion.copy(S40.quaternion)

s41.position.copy(S41.position)
s41.quaternion.copy(S41.quaternion)

s42.position.copy(S42.position)
s42.quaternion.copy(S42.quaternion)

s43.position.copy(S43.position)
s43.quaternion.copy(S43.quaternion)

s44.position.copy(S44.position)
s44.quaternion.copy(S44.quaternion)

s45.position.copy(S45.position)
s45.quaternion.copy(S45.quaternion)

s46.position.copy(S46.position)
s46.quaternion.copy(S46.quaternion)

s47.position.copy(S47.position)
s47.quaternion.copy(S47.quaternion)

s48.position.copy(S48.position)
s48.quaternion.copy(S48.quaternion)

s49.position.copy(S49.position)
s49.quaternion.copy(S49.quaternion)

s50.position.copy(S50.position)
s50.quaternion.copy(S50.quaternion)

s51.position.copy(S51.position)
s51.quaternion.copy(S51.quaternion)

s52.position.copy(S52.position)
s52.quaternion.copy(S52.quaternion)

s53.position.copy(S53.position)
s53.quaternion.copy(S53.quaternion)

s54.position.copy(S54.position)
s54.quaternion.copy(S54.quaternion)

s55.position.copy(S55.position)
s55.quaternion.copy(S55.quaternion)

s56.position.copy(S56.position)
s56.quaternion.copy(S56.quaternion)

s57.position.copy(S57.position)
s57.quaternion.copy(S57.quaternion)


s58.position.copy(S58.position)
s58.quaternion.copy(S58.quaternion)

s59.position.copy(S59.position)
s59.quaternion.copy(S59.quaternion)

s60.position.copy(S60.position)
s60.quaternion.copy(S60.quaternion)

s61.position.copy(S61.position)
s61.quaternion.copy(S61.quaternion)

s62.position.copy(S62.position)
s62.quaternion.copy(S62.quaternion)

s63.position.copy(S63.position)
s63.quaternion.copy(S63.quaternion)

s64.position.copy(S64.position)
s64.quaternion.copy(S64.quaternion)

s65.position.copy(S65.position)
s65.quaternion.copy(S65.quaternion)

s66.position.copy(S66.position)
s66.quaternion.copy(S66.quaternion)

s67.position.copy(S67.position)
s67.quaternion.copy(S67.quaternion)

s68.position.copy(S68.position)
s68.quaternion.copy(S68.quaternion)

s69.position.copy(S69.position)
s69.quaternion.copy(S69.quaternion)

s70.position.copy(S70.position)
s70.quaternion.copy(S70.quaternion)

s71.position.copy(S71.position)
s71.quaternion.copy(S71.quaternion)

s72.position.copy(S72.position)
s72.quaternion.copy(S72.quaternion)

s73.position.copy(S73.position)
s73.quaternion.copy(S73.quaternion)

s74.position.copy(S74.position)
s74.quaternion.copy(S74.quaternion)

s75.position.copy(S75.position)
s75.quaternion.copy(S75.quaternion)

s76.position.copy(S76.position)
s76.quaternion.copy(S76.quaternion)

s77.position.copy(S77.position)
s77.quaternion.copy(S77.quaternion)

s78.position.copy(S78.position)
s78.quaternion.copy(S78.quaternion)

s79.position.copy(S79.position)
s79.quaternion.copy(S79.quaternion)

s80.position.copy(S80.position)
s80.quaternion.copy(S80.quaternion)

s81.position.copy(S81.position)
s81.quaternion.copy(S81.quaternion)

s82.position.copy(S82.position)
s82.quaternion.copy(S82.quaternion)

s83.position.copy(S83.position)
s83.quaternion.copy(S83.quaternion)

s84.position.copy(S84.position)
s84.quaternion.copy(S84.quaternion)

s85.position.copy(S85.position)
s85.quaternion.copy(S85.quaternion)

s86.position.copy(S86.position)
s86.quaternion.copy(S86.quaternion)

s87.position.copy(S87.position)
s87.quaternion.copy(S87.quaternion)

s88.position.copy(S88.position)
s88.quaternion.copy(S88.quaternion)

s89.position.copy(S89.position)
s89.quaternion.copy(S89.quaternion)

s90.position.copy(S90.position)
s90.quaternion.copy(S90.quaternion)

s91.position.copy(S91.position)
s91.quaternion.copy(S91.quaternion)


s92.position.copy(S92.position)
s92.quaternion.copy(S92.quaternion)

s93.position.copy(S93.position)
s93.quaternion.copy(S93.quaternion)

s94.position.copy(S94.position)
s94.quaternion.copy(S94.quaternion)


s95.position.copy(S95.position)
s95.quaternion.copy(S95.quaternion)

s96.position.copy(S96.position)
s96.quaternion.copy(S96.quaternion)

s97.position.copy(S97.position)
s97.quaternion.copy(S97.quaternion)

s98.position.copy(S98.position)
s98.quaternion.copy(S98.quaternion)

s99.position.copy(S99.position)
s99.quaternion.copy(S99.quaternion)

s100.position.copy(S100.position)
s100.quaternion.copy(S100.quaternion)

s101.position.copy(S101.position)
s101.quaternion.copy(S101.quaternion)

s102.position.copy(S102.position)
s102.quaternion.copy(S102.quaternion)

s103.position.copy(S103.position)
s103.quaternion.copy(S103.quaternion)

s104.position.copy(S104.position)
s104.quaternion.copy(S104.quaternion)

s105.position.copy(S105.position)
s105.quaternion.copy(S105.quaternion)

s106.position.copy(S106.position)
s106.quaternion.copy(S106.quaternion)

s107.position.copy(S107.position)
s107.quaternion.copy(S107.quaternion)

s108.position.copy(S108.position)
s108.quaternion.copy(S108.quaternion)

s109.position.copy(S109.position)
s109.quaternion.copy(S109.quaternion)

s110.position.copy(S110.position)
s110.quaternion.copy(S110.quaternion)

s111.position.copy(S111.position)
s111.quaternion.copy(S111.quaternion)

s112.position.copy(S112.position)
s112.quaternion.copy(S112.quaternion)

s113.position.copy(S113.position)
s113.quaternion.copy(S113.quaternion)

s114.position.copy(S114.position)
s114.quaternion.copy(S114.quaternion)

s115.position.copy(S115.position)
s115.quaternion.copy(S115.quaternion)

s116.position.copy(S116.position)
s116.quaternion.copy(S116.quaternion)

s117.position.copy(S117.position)
s117.quaternion.copy(S117.quaternion)

s118.position.copy(S118.position)
s118.quaternion.copy(S118.quaternion)

s119.position.copy(S119.position)
s119.quaternion.copy(S119.quaternion)

s120.position.copy(S120.position)
s120.quaternion.copy(S120.quaternion)

s121.position.copy(S121.position)
s121.quaternion.copy(S121.quaternion)

s122.position.copy(S122.position)
s122.quaternion.copy(S122.quaternion)

s123.position.copy(S123.position)
s123.quaternion.copy(S123.quaternion)

s124.position.copy(S124.position)
s124.quaternion.copy(S124.quaternion)

s125.position.copy(S125.position)
s125.quaternion.copy(S125.quaternion)

s126.position.copy(S126.position)
s126.quaternion.copy(S126.quaternion)

s127.position.copy(S127.position)
s127.quaternion.copy(S127.quaternion)

s128.position.copy(S128.position)
s128.quaternion.copy(S128.quaternion)

s129.position.copy(S129.position)
s129.quaternion.copy(S129.quaternion)

s130.position.copy(S130.position)
s130.quaternion.copy(S130.quaternion)

s131.position.copy(S131.position)
s131.quaternion.copy(S131.quaternion)

s132.position.copy(S132.position)
s132.quaternion.copy(S132.quaternion)

s133.position.copy(S133.position)
s133.quaternion.copy(S133.quaternion)

s134.position.copy(S134.position)
s134.quaternion.copy(S134.quaternion)

s135.position.copy(S135.position)
s135.quaternion.copy(S135.quaternion)

s136.position.copy(S136.position)
s136.quaternion.copy(S136.quaternion)

s137.position.copy(S137.position)
s137.quaternion.copy(S137.quaternion)

s138.position.copy(S138.position)
s138.quaternion.copy(S138.quaternion)

s139.position.copy(S139.position)
s139.quaternion.copy(S139.quaternion)

s140.position.copy(S140.position)
s140.quaternion.copy(S140.quaternion)

s141.position.copy(S141.position)
s141.quaternion.copy(S141.quaternion)

s142.position.copy(S142.position)
s142.quaternion.copy(S142.quaternion)

s143.position.copy(S143.position)
s143.quaternion.copy(S143.quaternion)







//_____jangalB







//world.broadphase = new CANNON.SAPBroadphase(world);
//world.defaultContactMaterial.friction = 0;
renderer.render( scene, camera );
}


window.onresize = function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  
};
