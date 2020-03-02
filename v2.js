class Matrix {
	constructor(rows, cols) {
		this.m = ("0".repeat(rows).split("")).map((item) => {return ("0".repeat(cols).split("")).map((item2)=>{return parseInt(item2)})});
		this.rows = this.m.length;
		this.cols = this.m[0].length;
	}
}

class Vec4 {
	constructor(...coords) {
		this.x; this.y; this.z; this.w;
		this.quick_assign(...coords);
	}

	mlt4x4(mat) {
		if(isNaN(mat.m[0][0])) console.error("this aint a matrix chief");
		var temp = new Vec4(0, 0, 0, 0);
		temp.x = this.x * mat.m[0][0] + this.y * mat.m[0][1] + this.z * mat.m[0][2] + this.w * mat.m[0][3];
		temp.y = this.x * mat.m[1][0] + this.y * mat.m[1][1] + this.z * mat.m[1][2] + this.w * mat.m[1][3];
		temp.z = this.x * mat.m[2][0] + this.y * mat.m[2][1] + this.z * mat.m[2][2] + this.w * mat.m[2][3];
		temp.w = this.x * mat.m[3][0] + this.y * mat.m[3][1] + this.z * mat.m[3][2] + this.w * mat.m[3][3];
		return temp;
	}

	div4x4(mat) {
		if(isNaN(mat.m[0][0])) console.error("this aint a matrix chief");
		var temp = new Vec4(0, 0, 0, 0);
		temp.x = this.x / mat.m[0][0] + this.y / mat.m[0][1] + this.z / mat.m[0][2] + this.w / mat.m[0][3];
		temp.y = this.x / mat.m[1][0] + this.y / mat.m[1][1] + this.z / mat.m[1][2] + this.w / mat.m[1][3];
		temp.z = this.x / mat.m[2][0] + this.y / mat.m[2][1] + this.z / mat.m[2][2] + this.w / mat.m[2][3];
		temp.w = this.x / mat.m[3][0] + this.y / mat.m[3][1] + this.z / mat.m[3][2] + this.w / mat.m[3][3];
		return temp;
	}

	addVec(vec4) {
		return new Vec4(this.x+vec4.x, this.y+vec4.y, this.z+vec4.z, this.w+vec4.w);
	}

	subVec(vec4) {
		return new Vec4(this.x-vec4.x, this.y-vec4.y, this.z-vec4.z, this.w-vec4.w);
	}

	mltScalar(scalar) {
		return new Vec4(this.x*scalar, this.y*scalar, this.z*scalar, this.w*scalar);
	}

	divScalar(scalar) {
		return new Vec4(this.x/scalar, this.y/scalar, this.z/scalar, this.w/scalar);
	}

	quick_assign(...coords) {
		if(typeof(coords[0]) == "object") {
			this.x = coords[0].x;
			this.y = coords[0].y;
			this.z = coords[0].z;
			this.w = (!isNaN(coords[0].w)) ? coords[0].w : 1;
		} else if(coords.length < 4) {
			console.warn(); ("this requires 4 arguments or an object dumbass");
		} else {
			this.x = parseFloat(coords[0]);
			this.y = parseFloat(coords[1]);
			this.z = parseFloat(coords[2]);
			this.w = parseFloat(coords[3]);
		}
	}
}

class Vec3 {
	constructor(...coords) {
		this.x; this.y; this.z;
		this.quick_assign(...coords);
	}

	mlt3x3(mat) {
		if(isNaN(mat.m[0][0])) console.error("this aint a matrix chief");
		var temp = new Vec3(0, 0, 0);
		temp.x = this.x * mat.m[0][0] + this.y * mat.m[0][1] + this.z * mat.m[0][2];
		temp.y = this.x * mat.m[1][0] + this.y * mat.m[1][1] + this.z * mat.m[1][2];
		temp.z = this.x * mat.m[2][0] + this.y * mat.m[2][1] + this.z * mat.m[2][2];
		return temp;
	}

	div3x3(mat) {
		if(isNaN(mat.m[0][0])) console.error("this aint a matrix chief");
		var temp = new Vec3(0, 0, 0);
		temp.x = this.x / mat.m[0][0] + this.y / mat.m[0][1] + this.z / mat.m[0][2];
		temp.y = this.x / mat.m[1][0] + this.y / mat.m[1][1] + this.z / mat.m[1][2];
		temp.z = this.x / mat.m[2][0] + this.y / mat.m[2][1] + this.z / mat.m[2][2];
		return temp;
	}

	addVec(vec3) {
		return new Vec3(this.x+vec3.x, this.y+vec3.y, this.z+vec3.z);
	}

	subVec(vec3) {
		return new Vec3(this.x-vec3.x, this.y-vec3.y, this.z-vec3.z);
	}

	mltScalar(scalar) {
		return new Vec3(this.x*scalar, this.y*scalar, this.z*scalar);
	}

	divScalar(scalar) {
		return new Vec3(this.x/scalar, this.y/scalar, this.z/scalar);
	}

	static crs(v1, v2) {
		// cross product
		return new Vec3((v1.y * v2.z) - (v1.z * v2.y), (v1.z * v2.x) - (v1.x * v2.z), (v1.x * v2.y) - (v1.y * v2.x));
	}

	static dot(v1, v2) {
		return (v1.x * v2.x) + (v1.y * v2.y) + (v1.z * v2.z);
	}

	quick_assign(...coords) {
		if(typeof(coords[0]) == "object" && !isNaN(coords[0].z)) {
			this.x = coords[0].x;
			this.y = coords[0].y;
			this.z = coords[0].z;
		} else if(coords.length < 3) {
			console.error("this requires 3 arguments or an object dumbass");
		} else {
			this.x = parseFloat(coords[0]);
			this.y = parseFloat(coords[1]);
			this.z = parseFloat(coords[2]);
		}
	}
}

class Vec2 {
	constructor(x, y, data = undefined) {
		this.set(x, y, data);
	}

	set(newX, newY, newData = undefined) {
		this.x = newX;
		this.y = newY;
		this.data = newData;
	}

	get mag() {
		return Math.hypot(this.x, this.y);
	}

	get norm() {
		return this.scale(1/this.mag);
	}

	set mag(val) {
		this.clone(this.norm.scale(val));
	}

	scale(scalar) {
		return new Vec2(this.x * scalar, this.y * scalar);
	}

	setScale(scalar) {
		this.x *= scalar;
		this.y *= scalar;
	}

	clone(v) {
		this.x = v.x;
		this.y = v.y;
	}

	static crs(v1, v2) {
		return (v1.x * v2.y) - (v1.y * v2.x);
	}

	static sub(v1, v2) {
		return new Vec2(v1.x - v2.x, v1.y - v2.y);
	}

	static add(v1, v2) {
		return new Vec2(v1.x + v2.x, v1.y + v2.y);
	}

	static eql(v1, v2) {
		return v1.x == v2.x && v1.y == v2.y;
	}
}

class ChildMesh3d {
	constructor(...coords) {
		this.polygons = [];
		this.polyBase = [];
		this.color = "green";
		this.scale = 1;
		this.coords = new Vec3(...coords);
		this.rotation = new Vec3(0, 0, 0);
		this.min = new Vec3(0, 0, 0);
		this.min = new Vec3(0, 0, 0);
	}

	calcBoxBase() {
		this.min = new Vec3(Infinity, Infinity, Infinity);
		this.max = new Vec3(-Infinity, -Infinity, -Infinity);

		for(var p of this.polyBase) {
			for(var v of p.vecs) {
				if(v.x < this.min.x) this.min.x = v.x;
				else if(v.x > this.max.x) this.max.x = v.x;

				if(v.y < this.min.y) this.min.y = v.y;
				else if(v.y > this.max.y) this.max.y = v.y;

				if(v.z < this.min.z) this.min.z = v.z;
				else if(v.z > this.max.z) this.max.z = v.z;
			}
		}
	}

	calcBox() {
		this.min = new Vec3(Infinity, Infinity, Infinity);
		this.max = new Vec3(-Infinity, -Infinity, -Infinity);

		for(var p of this.polygons) {
			for(var v of p.vecs) {
				if(v.x < this.min.x) this.min.x = v.x;
				else if(v.x > this.max.x) this.max.x = v.x;

				if(v.y < this.min.y) this.min.y = v.y;
				else if(v.y > this.max.y) this.max.y = v.y;

				if(v.z < this.min.z) this.min.z = v.z;
				else if(v.z > this.max.z) this.max.z = v.z;
			}
		}
	}

	static center(mesh) {
		mesh.calcBoxBase();
		var min = mesh.min;
		var max = mesh.max;

		return new Vec3(min.x + ((max.x - min.x) / 2), min.y + ((max.y - min.y) / 2), min.z + ((max.z - min.z) / 2));
	}
}

class ParentMesh3d {
	constructor(...coords) {
		this.base = [];
		this.children = [];
		this.vertices = [];
		this.namedChildren = {};
		this.scale = 1;
		this.coords = new Vec3(...coords);
		this.rotation = new Vec3(0, 0, 0);
	}
}

class Polygon {
	constructor() {
		this.vecs = [];
		this.zval = -Infinity;
	}

	clone() {
		var temp = new Polygon();
		temp.vecs = Array.from(this.vecs);
		temp.updateZval();
		return temp;
	}

	scale(scalar) {
		for(var v in this.vecs) this.vecs[v] = this.vecs[v].mltScalar(scalar);
	}

	rotate(vec) {
		for(var v in this.vecs) Engine.rotate(this.vecs[v], this.vecs[v], vec.x, vec.y, vec.z);
	}

	translate(vec) {
		for(var v in this.vecs) this.vecs[v] = this.vecs[v].addVec(vec);
	}

	updateZval() {
		for(var i = 0; i < this.vecs.length; i++) {	if(this.vecs[i].z > this.zval) this.zval = this.vecs[i].z; }
	}
}

class Camera {
	constructor(...coords) {
		this.x; this.y; this.z;
		this.quick_assign(...coords);
		this.base = new Vec3(this);
		this.fov = 90;
		this.f;
		this.q;
		this.orientation = [0, 0, 0];
		this.view_max = 250;
		this.view_min = 10;
	}

	quick_assign(...coords) {
		if(typeof(coords[0]) == "object" && !isNaN(coords[0].z)) {
			this.x = coords[0].x;
			this.y = coords[0].y;
			this.z = coords[0].z;
		} else if(coords.length < 3) {
			console.error("camera's position is supposed to be set with a Vec3");
		} else {
			this.x = parseFloat(coords[0]);
			this.y = parseFloat(coords[1]);
			this.z = parseFloat(coords[2]);
		}
	}

	rotate(deg_x, deg_y, deg_z) {
		this.orientation = [(360 + deg_x + this.orientation[0])%360, (360 + deg_y + this.orientation[1])%360, (360 + deg_z + this.orientation[2])%360];
		Engine.rotate(this, this.base, ...this.orientation);
	}

	rotateTo(deg_x, deg_y, deg_z) {
		this.orientation = [(360 + deg_x)%360, (360 + deg_y)%360, (360 + deg_z)%360];
		Engine.rotate(this, this.base, ...this.orientation);
	}
}

class World {
	constructor(world_size_x, world_size_y, world_size_z) {
		this.dimensions = new Vec3(world_size_x, world_size_y, world_size_z);
		this.objects = [];
	}
}

class Engine {
	constructor(canvas_context, world_size_x, world_size_y, world_size_z) {
		this.camera = new Camera(new Vec3(0, 0, 0));
		this.projected = [];
		this.world = new World(world_size_x, world_size_y, world_size_z);
		this.ctx = canvas_context; this.screen_height; this.screen_width; this.aspect_ratio;
		this.resizeScreen(this);
		window.addEventListener("resize", _=>{this.resizeScreen(this)});
	}

	static rotateX(vec3, deg) {
		var base = new Vec3(vec3), mat = new Matrix(3, 3), rad = ((360 + deg)%360) * Math.PI/180, cos = Math.cos(rad), sin = Math.sin(rad);
		mat.m[0] = [1, 0, 0]; mat.m[1] = [0, cos, -sin]; mat.m[2] = [0, sin, cos];
		vec3.quick_assign(base.mlt3x3(mat));
	}

	static rotateY(vec3, deg) {
		var base = new Vec3(vec3), mat = new Matrix(3, 3), rad = ((360 + deg)%360) * Math.PI/180, cos = Math.cos(rad), sin = Math.sin(rad);
		mat.m[0] = [cos, 0, sin]; mat.m[1] = [0, 1, 0]; mat.m[2] = [-sin, 0, cos];
		vec3.quick_assign(base.mlt3x3(mat));
	}

	static rotateZ(vec3, deg) {
		var base = new Vec3(vec3), mat = new Matrix(3, 3), rad = ((360 + deg)%360) * Math.PI/180, cos = Math.cos(rad), sin = Math.sin(rad);
		mat.m[0] = [cos, -sin, 0]; mat.m[1] = [sin, cos, 0]; mat.m[2] = [0, 0, 1];
		vec3.quick_assign(base.mlt3x3(mat));
	}

	static rotate(vec, base, deg_x, deg_y, deg_z) {
		var noRef = new Vec3(base);

		if(deg_y) Engine.rotateY(noRef, deg_y);
		if(deg_z) Engine.rotateZ(noRef, deg_z);
		if(deg_x) Engine.rotateX(noRef, deg_x);

		vec.quick_assign(noRef);
	}


	get projection_matrix() {
		var mat = new Matrix(4, 4); this.camera.q = this.camera.view_max/(this.camera.view_max-this.camera.view_min); this.camera.f = 1/(Math.tan(this.camera.fov/2)*(180/Math.PI));
		mat.m[0] = [this.aspect_ratio*this.camera.f, 0,             0,                                   0];
		mat.m[1] = [0,                               this.camera.f, 0,                                   0];
		mat.m[2] = [0,                               0,             this.camera.q,                       1];
		mat.m[3] = [0,                               0,             -this.camera.view_min*this.camera.q, 0];
		return mat;
	}

	loadObjFile(fileString) {
		var parts = fileString.split("o ");
		var parent = new ParentMesh3d(0, 0, 0);
		var vecs = [];

		for(var i of parts) {
			var child = new ChildMesh3d(0, 0, 0);
			var lines = i.split("\n");

			for(var j of lines) {
				j = j.replace(/\s+g/, " ").trim().split(" ");
				if(j[0] == "v") {
					vecs.push(new Vec3(j[1], j[2], j[3]));
				}
			}

			for(var j of lines) {
				j = j.replace(/\s+g/, " ").trim().split(" ");
				if(j[0] == "f") {
					var polygon = new Polygon();
					for(var k = 1; k < j.length; k++) {
						polygon.vecs.push(vecs[parseInt(j[k].split("//")[0])-1]);
					}
					polygon.updateZval();
					child.polygons.push(polygon);
					child.polyBase.push(polygon);
				}
			}
			if(child.polygons.length > 0) parent.children.push(child);
		}
		this.world.objects.push(parent);
	}

	drawPolygon(vecs, color) {
		var P = vecs[0], ctx = this.ctx;
		ctx.beginPath();
		ctx.moveTo(P.x + (0.5 * this.screen_width), P.y + (0.5 * this.screen_height));
		for(var i = 1; i < vecs.length; i++) {
			P = vecs[i];
			ctx.lineTo(P.x + (0.5 * this.screen_width), P.y + (0.5 * this.screen_height));
		}
		ctx.closePath();
		ctx.fillStyle = color;
		// ctx.stroke();
		ctx.fill();
	}

	project(vec3, mat) {
		vec3.addVec(new Vec3(0, 0, 3));
		var temp = new Vec4(vec3).mlt4x4(mat),
		projected = (temp.w != 0) ? temp.divScalar(temp.w) : temp;
		return projected;
	}

	update() {
		for(var i of this.world.objects) {
			for(var j of i.children) {
				var center = ChildMesh3d.center(j);
				for(var k in j.polyBase) {
					j.polygons[k] = j.polyBase[k].clone();
					let p = j.polygons[k];

					p.scale(i.scale);
					p.translate(center.mltScalar(-1));
					p.scale(j.scale);
					p.rotate(j.rotation);
					p.translate(center);
					p.rotate(i.rotation);
					p.translate(i.coords);
					p.translate(j.coords);
					p.updateZval();
				}
				j.calcBox();
			}
		}
	}

	backcull(p) {
		var	T = p.vecs[0].subVec(this.camera),
			vec1 = p.vecs[1].subVec(p.vecs[0]),
			vec2 = p.vecs[2].subVec(p.vecs[0]);

		var N = Vec3.crs(vec1, vec2);

		// if the dot product of T and N is greater than 0, discard this polygon
		if(Vec3.dot(T, N) >= 0) return true;
		else return false;
	}

	render() {
		var mat = this.projection_matrix;
		this.ctx.clearRect(0, 0, this.screen_width, this.screen_height);

		for(var i of this.world.objects) {
			this.projected = [];
			i.children.sort((a, b) => b.max.z - a.max.z);
			for(var j of i.children) {
				j.polygons.sort((a, b) => b.zval - a.zval);
				for(var k of j.polygons) {
					let vecs = Array.from(k.vecs);
					vecs.map(item => this.project(item, mat));
					this.projected.concat(vecs);
					this.drawPolygon(vecs, j.color);
				}
			}
		}
	}

	resizeScreen(eng) {
		eng.screen_height = document.documentElement.clientHeight;
		eng.screen_width = document.documentElement.clientWidth;
		eng.ctx.canvas.width = this.screen_width;
		eng.ctx.canvas.height = this.screen_height;
		eng.aspect_ratio = this.screen_height / this.screen_width;
	}
}
