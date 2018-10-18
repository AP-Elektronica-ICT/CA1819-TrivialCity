import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import leaflet from 'leaflet';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;

  playericon = leaflet.icon({
    iconUrl: '../assets/imgs/playericon.png',
    iconSize: [24,24]
  })

  geojsonfeature: any = {"type":"GeometryCollection","geometries":[{"type":"MultiPolygon","coordinates":[[[[4.4270907,51.238529999999997],[4.4290037,51.236692499999997],[4.4315464,51.236819099999998],[4.4321488,51.235750299999999],[4.4346717,51.2346407],[4.4367724,51.233376900000003],[4.4412956,51.230168300000003],[4.4427118,51.230297299999997],[4.443038,51.233500499999998],[4.4429693,51.234091599999999],[4.4424973,51.235204099999997],[4.4561014,51.237960899999997],[4.4577146,51.238273200000002],[4.4571579,51.238888099999997],[4.4569882,51.239047800000002],[4.45677,51.239503900000003],[4.4567014,51.239735000000003],[4.45677,51.240326099999997],[4.4565297,51.240793600000003],[4.4560319,51.241422200000002],[4.4558259,51.241895100000001],[4.4547101,51.243587699999999],[4.4565984,51.244769699999999],[4.4561006,51.245468199999998],[4.4562948,51.245573899999997],[4.4572849,51.2461129],[4.4585466,51.246580399999999],[4.4597723,51.246921899999997],[4.4596872,51.247082499999998],[4.4593932,51.247540000000001],[4.4593612,51.247605399999998],[4.4595233,51.247641799999997],[4.4609,51.248136000000002],[4.461364,51.248304099999999],[4.462115,51.248576999999997],[4.4625486,51.248731999999997],[4.4635263,51.249086300000002],[4.46464,51.249485100000001],[4.4656989,51.249866300000001],[4.4662306,51.250019500000001],[4.4660981,51.2502292],[4.4657919,51.250771200000003],[4.4644498,51.252849900000001],[4.4638012,51.253917100000002],[4.4641858,51.254654899999998],[4.463482,51.256948600000001],[4.4634391,51.257410499999999],[4.4639541,51.2597041],[4.4640141,51.260042499999997],[4.4640468,51.260499099999997],[4.4631557,51.2654134],[4.462924,51.266863399999998],[4.4628811,51.2670137],[4.4627609,51.267201700000001],[4.4624863,51.267362800000001],[4.4619132,51.267696299999997],[4.4616785,51.267840800000002],[4.4614338,51.268078099999997],[4.4609078,51.2684347],[4.4605346,51.268844899999998],[4.4599253,51.268989599999998],[4.4593502,51.268887599999999],[4.4589125,51.268925099999997],[4.4577452,51.268796199999997],[4.4571186,51.268946499999998],[4.4566809,51.269177499999998],[4.4564062,51.269268799999999],[4.4559513,51.2693011],[4.4554792,51.269236499999998],[4.4550501,51.269236499999998],[4.4548527,51.269306299999997],[4.4545952,51.269370799999997],[4.4542519,51.269413700000001],[4.4541059,51.269478200000002],[4.4538656,51.269494299999998],[4.4537626,51.2694245],[4.4537025,51.269343900000003],[4.4534794,51.269300999999999],[4.4531017,51.269268699999998],[4.4529043,51.2692634],[4.4527841,51.269145199999997],[4.4525352,51.2691023],[4.4521833,51.269118400000004],[4.4517456,51.269150600000003],[4.4514452,51.269150600000003],[4.4512049,51.269182800000003],[4.4509388,51.2692902],[4.4505783,51.2694191],[4.450338,51.269553299999998],[4.449944,51.269647399999997],[4.4494719,51.269674299999998],[4.4491286,51.269679699999998],[4.4484505,51.269534700000001],[4.447806,51.269376100000002],[4.4476,51.269215000000003],[4.4473768,51.268994900000003],[4.4472738,51.268785399999999],[4.4471622,51.268592099999999],[4.4470421,51.268516900000002],[4.4468618,51.268495399999999],[4.4468447,51.268441699999997],[4.4469133,51.2682377],[4.4468962,51.268081899999999],[4.4467975,51.267555399999999],[4.4465057,51.266776700000001],[4.4458877,51.266701500000003],[4.4453727,51.266067800000002],[4.4449865,51.266078499999999],[4.4441281,51.266347000000003],[4.4436732,51.265358900000003],[4.4425231,51.265450199999997],[4.4420253,51.2655952],[4.44127,51.265503899999999],[4.44024,51.265036600000002],[4.4390899,51.265025899999998],[4.4373218,51.264322300000003],[4.4364463,51.263812100000003],[4.4352876,51.263704699999998],[4.4346868,51.262888400000001],[4.4333564,51.262684299999997],[4.4321548,51.261781900000003],[4.4308244,51.262157899999998],[4.4293653,51.261996799999999],[4.4277774,51.261287799999998],[4.4270477,51.259112600000002],[4.4262152,51.256883500000001],[4.4259577,51.2562389],[4.4258204,51.255701700000003],[4.4256144,51.254960400000002],[4.425417,51.254100899999997],[4.4248762,51.251538400000001],[4.4247046,51.249835400000002],[4.4246702,51.2474177],[4.4248419,51.244312200000003],[4.4250307,51.241399999999999],[4.4255285,51.240658500000002],[4.4270907,51.238529999999997]]]]}]};

  //geojsonlayer = leaflet.geoJSON().addTo(this.map);

  districts: any[] = [{
        name: 'Den Dam',
        p1: {
          lat: 51.226317,
          lng: 4.414693
        },
        p2: {
          lat: 51.230859,
          lng: 4.413208
        },
        p3: {
          lat: 51.231278,
          lng: 4.419713
        },
        p4: {
          lat: 51.235015,
          lng: 4.420325
        },
        p5: {
          lat: 51.234914,
          lng: 4.428972
        },
        p6: {
          lat: 51.227991,
          lng: 4.439990
        },
        p7: {
          lat: 51.226783,
          lng: 4.436743
        },
        p8: {
          lat: 51.227663,
          lng: 4.435061
        },
        p9: {
          lat: 51.227942,
          lng: 4.433815
        },
        p10: {
          lat: 51.227836,
          lng: 4.430798
        },
        p11: {
          lat: 51.228767,
          lng: 4.426224
        },
    },{
      name: 'Het Eilandje',
      p1: {
        lat: 51.226317,
        lng: 4.414693,
      },
      p2: {
        lat: 51.227108,
        lng: 4.411271
      },
      p3: {
        lat: 51.226936,
        lng: 4.405197
      },
      p4: {
        lat: 51.227091,
        lng: 4.401156
      },
      p5: {
        lat: 51.227080,
        lng: 4.399555
      },
      p6: {
        lat: 51.232166,
        lng: 4.401722
      },
      p7: {
        lat: 51.235310,
        lng: 4.401036
      },
      p8: {
        lat: 51.238508,
        lng: 4.397946
      },
      p9: {
        lat: 51.241786,
        lng: 4.404469
      },
      p10: {
        lat: 51.241899,
        lng: 4.407903
      },
      p11: {
        lat: 51.239587,
        lng: 4.420263
      },
      p12: {
        lat: 51.235015,
        lng: 4.420325
      },  
      p13: {
        lat: 51.231278,
        lng: 4.419713
      },
      p14: {
        lat: 51.230859,
        lng: 4.413208
      }
    },{
      name: 'Seefhoek',
      p1: {
        lat: 51.226317,
        lng: 4.414693
      },
      p2: {
        lat: 51.228767,
        lng: 4.426224
      },
      p3: {
        lat: 51.227836,
        lng: 4.430798
      },
      p4: {
        lat: 51.227942,
        lng: 4.433815,
      },
      p5: {
        lat: 51.227663,
        lng: 4.435061
      },
      p6: {
        lat: 51.226783,
        lng: 4.436743
      },
      p7: {
        lat: 51.221772,
        lng: 4.436900
      },
      p8: {
        lat: 51.219695,
        lng: 4.435456
      },
      p9: {
        lat: 51.218802,
        lng: 4.431648
      },
      p10: {
        lat: 51.218956,
        lng: 4.431175
      },
      p11: {
        lat: 51.217511,
        lng: 4.428144
      },
      p12: {
        lat: 51.218701,
        lng: 4.423484
      },
      p13: {
        lat: 51.219779,
        lng: 4.416132
      },
      p14: {
        lat: 51.220934,
        lng: 4.416598
      }
    },{
      name: 'Borgerhout',
      p1: {
        lat: 51.227991,
        lng: 4.439990
      },
      p2: {
        lat: 51.220914,
        lng: 4.449414
      },
      p3: {
        lat: 51.217855,
        lng: 4.447352
      },
      p4: {
        lat: 51.215694,
        lng: 4.446721
      },
      p5: {
        lat: 51.213827,
        lng: 4.440785
      },
      p6: {
        lat: 51.215598,
        lng: 4.432207
      },
      p7: {
        lat: 51.216351,
        lng: 4.430431
      },
      p8: {
        lat: 51.217257,
        lng: 4.429056
      },
      p9: {
        lat: 51.217511,
        lng: 4.428144
      },
      p10: {
        lat: 51.218956,
        lng: 4.431175
      },
      p11: {
        lat: 51.218802,
        lng: 4.431648
      },
      p12: {
        lat: 51.219695,
        lng: 4.435456
      },
      p13:  {
        lat: 51.221772,
        lng: 4.436900
      },
      p14: {
        lat: 51.226783,
        lng: 4.436743
      }
    },{
      name: 'De Kaai',
      p1: {
        lat: 51.227080,
        lng: 4.399555
      },
      p2: {
        lat: 51.227091,
        lng: 4.401156
      },
      p3: {
        lat: 51.226356,
        lng: 4.400389
      },
      p4: {
        lat: 51.222221,
        lng: 4.397784
      },
      p5: {
        lat: 51.218815,
        lng: 4.395516
      },
      p6: {
        lat: 51.219131,
        lng: 4.394291
      },
      p7: {
        lat: 51.221740,
        lng: 4.396078
      },
      p8: {
        lat: 51.221836,
        lng: 4.395771
      },
      p9: {
        lat: 51.222668,
        lng: 4.396323
      },
      p10: {
        lat: 51.222697,
        lng: 4.396713
      },
      p11: {
        lat: 51.227080,
        lng: 4.399555
      }
    }];

  polygon = leaflet.polygon([
    [
    //Den Dam
    [this.districts[0].p1.lat, this.districts[0].p1.lng],
    [this.districts[0].p2.lat, this.districts[0].p2.lng],
    [this.districts[0].p3.lat, this.districts[0].p3.lng],
    [this.districts[0].p4.lat, this.districts[0].p4.lng],
    [this.districts[0].p5.lat, this.districts[0].p5.lng],
    [this.districts[0].p6.lat, this.districts[0].p6.lng],
    [this.districts[0].p7.lat, this.districts[0].p7.lng],
    [this.districts[0].p8.lat, this.districts[0].p8.lng],
    [this.districts[0].p9.lat, this.districts[0].p9.lng],
    [this.districts[0].p10.lat, this.districts[0].p10.lng],
    [this.districts[0].p11.lat, this.districts[0].p11.lng],
  ],
  [//Het Eilandje
    [this.districts[1].p1.lat, this.districts[1].p1.lng],
    [this.districts[1].p2.lat, this.districts[1].p2.lng],
    [this.districts[1].p3.lat, this.districts[1].p3.lng],
    [this.districts[1].p4.lat, this.districts[1].p4.lng],
    [this.districts[1].p5.lat, this.districts[1].p5.lng],
    [this.districts[1].p6.lat, this.districts[1].p6.lng],
    [this.districts[1].p7.lat, this.districts[1].p7.lng],
    [this.districts[1].p8.lat, this.districts[1].p8.lng],
    [this.districts[1].p9.lat, this.districts[1].p9.lng],
    [this.districts[1].p10.lat, this.districts[1].p10.lng],
    [this.districts[1].p11.lat, this.districts[1].p11.lng],
    [this.districts[1].p12.lat, this.districts[1].p12.lng],
    [this.districts[1].p13.lat, this.districts[1].p13.lng],
    [this.districts[1].p14.lat, this.districts[1].p14.lng],
  ],
  [//Seefhoek
    [this.districts[2].p1.lat, this.districts[2].p1.lng],
    [this.districts[2].p2.lat, this.districts[2].p2.lng],
    [this.districts[2].p3.lat, this.districts[2].p3.lng],
    [this.districts[2].p4.lat, this.districts[2].p4.lng],
    [this.districts[2].p5.lat, this.districts[2].p5.lng],
    [this.districts[2].p6.lat, this.districts[2].p6.lng],
    [this.districts[2].p7.lat, this.districts[2].p7.lng],
    [this.districts[2].p8.lat, this.districts[2].p8.lng],
    [this.districts[2].p9.lat, this.districts[2].p9.lng],
    [this.districts[2].p10.lat, this.districts[2].p10.lng],
    [this.districts[2].p11.lat, this.districts[2].p11.lng],
    [this.districts[2].p12.lat, this.districts[2].p12.lng],
    [this.districts[2].p13.lat, this.districts[2].p13.lng],
    [this.districts[2].p14.lat, this.districts[2].p14.lng],
  ],
  [//Borgerhout
    [this.districts[3].p1.lat, this.districts[3].p1.lng],
    [this.districts[3].p2.lat, this.districts[3].p2.lng],
    [this.districts[3].p3.lat, this.districts[3].p3.lng],
    [this.districts[3].p4.lat, this.districts[3].p4.lng],
    [this.districts[3].p5.lat, this.districts[3].p5.lng],
    [this.districts[3].p6.lat, this.districts[3].p6.lng],
    [this.districts[3].p7.lat, this.districts[3].p7.lng],
    [this.districts[3].p8.lat, this.districts[3].p8.lng],
    [this.districts[3].p9.lat, this.districts[3].p9.lng],
    [this.districts[3].p10.lat, this.districts[3].p10.lng],
    [this.districts[3].p11.lat, this.districts[3].p11.lng],
    [this.districts[3].p12.lat, this.districts[3].p12.lng],
    [this.districts[3].p13.lat, this.districts[3].p13.lng],
    [this.districts[3].p14.lat, this.districts[3].p14.lng],
  ],
  [//De Kaai
    [this.districts[4].p1.lat, this.districts[4].p1.lng],
    [this.districts[4].p2.lat, this.districts[4].p2.lng],
    [this.districts[4].p3.lat, this.districts[4].p3.lng],
    [this.districts[4].p4.lat, this.districts[4].p4.lng],
    [this.districts[4].p5.lat, this.districts[4].p5.lng],
    [this.districts[4].p6.lat, this.districts[4].p6.lng],
    [this.districts[4].p7.lat, this.districts[4].p7.lng],
    [this.districts[4].p8.lat, this.districts[4].p8.lng],
    [this.districts[4].p9.lat, this.districts[4].p9.lng],
    [this.districts[4].p10.lat, this.districts[4].p10.lng],
    [this.districts[4].p11.lat, this.districts[4].p11.lng],
  ]
]);

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  ionViewDidEnter() {
    this.loadmap();
    console.log(this.districts[1].p1.lat);
  }

  loadmap(){
    // This adds the map to the screen
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Sam',
      maxZoom: 20
    }).addTo(this.map);

    //This will add geolocation
    this.map.locate({
      setView: true,
      maxZoom: 18
    }).on('locationfound', (e) => {
      console.log('playerlocation found');
      }).on('locationfound', (e) => {
        // Add player icon to player location
        let markerGroup = leaflet.featureGroup();
        let marker: any = leaflet.marker([e.latitude, e.longitude], {icon: this.playericon})
        markerGroup.addLayer(marker);
        this.map.addLayer(markerGroup);
        }).on('locationerror', (err) => {
          alert(err.message);
      })
    //This adds custom district polygons to the map
    this.polygon.addTo(this.map);
  }

}
