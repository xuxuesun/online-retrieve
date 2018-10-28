/*!
 * Ext JS Library 3.2.1
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.onReady(function(){

    Ext.QuickTips.init();

    // turn on validation errors beside the field globally
    Ext.form.Field.prototype.msgTarget = 'side';

    var bd = Ext.getBody();

	var cnt=1;
    /*
     * ================  Simple form  =======================
     */
    bd.createChild({tag: 'h2', html: 'Simple Search'});

	var authorList = new Ext.Toolbar({
                
				layout:'form',
				
				items:[{
					xtype:"button",
					icon:'add16.gif',
						handler:function(){
						var _con = this.ownerCt;
						
						var _txt = new Ext.form.Field({id:"aut"+cnt});
						cnt = cnt+1;
						_con.add(_txt);
						_con.doLayout();
						}
				},{
					id:"aut0",
					name:"aut0",
					"xtype":"textfield",
					fieldLabel: 'Authors'
				}]
		
		
	});
	
	var exstore = new Ext.data.ArrayStore({
																id:0,
																fields:['myeid','ex'],
																data:[[1,'AND'],[2,'OR']]
																	 });
	
	var YearRecord = Ext.data.Record.create([
	{name:'myyid'},
	{name:'ye'}
]);
	var ystore = new Ext.data.ArrayStore({
																id:0,
																fields:['myyid','ye']
																	 });
	for(j=0; j < 100;j++)
	{
		var rec = new YearRecord({myyid:j,ye:1950+j});
		ystore.add(rec);
	}
	
	var years = new Ext.form.ComboBox({
									typeAhead:true,
									 mode:'local',
									   triggerAction:'all',
									   id:"pubyear",
									   name:"pubyear",
									   store:ystore,
											   valueField:'myyid',
											   displayField:'ye',
											   width:50
									});
	
	var exps1 = new Ext.form.ComboBox({
									typeAhead:true,
									 mode:'local',
									   triggerAction:'all',
									   id:"exps1",
									   store:exstore,
											   valueField:'myeid',
											   displayField:'ex',
											   width:50
									});
	var exps2 = new Ext.form.ComboBox({
									typeAhead:true,
									 mode:'local',
									   triggerAction:'all',
									   id:"exps2",
									   name:"exps2",   
									   store:exstore,
											   valueField:'myeid',
											   displayField:'ex',
											   width:50
									});

	
	var kw = {
		
		xtype:'fieldset',
		layout:'form',
		title:'Keywords',
		width:300,
		items:[{
			   layout:'column',
			   border:false,
			   items:[{
					  columnWidth:'.3',
					  layout:'form',
					  anchor:'95%',
					  
					  items: {
						xtype:'textfield',
						id:'kw1',
						name:"kw1",
						fieldLabel:'1',
						hideLabel:true
					  	}
					  },exps1,{
						columnWidth:'.3',
					  layout:'form',
					  anchor:'95%',
					  items: {
						xtype:'textfield',
						id:'kw2',
						name:"kw2",
						fieldLabel:'2',
						hideLabel:true
					  	}
					},exps2,{
						columnWidth:'.3',
					  layout:'form',
					  anchor:'95%',
					  items: {
						xtype:'textfield',
						id:'kw3',
						name:"kw3",
						fieldLabel:'3',
						hideLabel:true
					  	}
					}]
			   }]
	}
	
	var tystore = new Ext.data.ArrayStore({
										  		id:0,
											   fields:['myid','type'],
											   data:[[1,'Journal'],[2,'Conference'],[3,'Book']]
											   });
	
	var choose = new Ext.form.ComboBox({
									   id:"pubtype",
									   name:"pubtype",
									   typeAhead:true,
									   mode:'local',
									   triggerAction:'all',
									   fieldLabel: 'Publication Type',
									   store:tystore,
											   valueField:'myid',
											   displayField:'type'				   
									   });
	
	var fldstore = new Ext.data.ArrayStore({
										  		id:0,
											   fields:['myfid','fld'],
											   data:[[1,'Title'],[2,'Abstract'],[3,'Author Name'],
													[4,'Journal Name']]
											   });
	var fldcnt = 0;
	
    var simple = new Ext.FormPanel({
		id:'simple',
        labelWidth: 75, // label settings here cascade unless overridden
        //url:'query.php',			//save-form.php
        frame:true,
        title: 'Simple Search Form',
        bodyStyle:'padding:5px 5px 0',
        width: 350,
        defaults: {width: 230},
        defaultType: 'textfield',

        items: [{
                fieldLabel: 'Title',
                id: 'title',
				name:'title'
             //   allowBlank:false		//if could be null in database
            },authorList,choose,{
				fieldLabel: 'Publication Name',
                id: 'pubname',
				name:'pubname'
			},kw, {
                fieldLabel: 'Abstract',
				name:'abstract',
                id: 'abstract'
            },{
                fieldLabel: 'DOI',
				name:'doi',
                id: 'doi'
            },{
				xtype:'label',
				text:'Search Time'
				
			},years,new Ext.form.DateField({
				id:'fromt',
				name:'fromt',
				fieldLabel: 'From',
				format:'Y-m-d'
			}),new Ext.form.DateField({
				id:'tot',
				name:'tot',
				fieldLabel: 'To',
				format:'Y-m-d'
			})
			
			],

        buttons: [{
            text: 'Search',
			handler:function(){
				
				
				
				//Ext.MessageBox.show({msg:Ext.get('title').dom.value});
				
				//var f = "";
				//for(i=0;i<cnt;i++)
				// f += Ext.get('aut'+i).getValue()+";";
				//Ext.MessageBox.show({msg:f});
				
				//Ext.MessageBox.show({msg:Ext.get('pubtype').dom.value});
				
				//Ext.MessageBox.show({msg:Ext.get('pubname').dom.value});
				
				//Ext.MessageBox.show({msg:Ext.get('abstract').dom.value});
				
				//Ext.MessageBox.show({msg:Ext.get('fromt').dom.value});
				
				//Ext.MessageBox.show({msg:Ext.get('tot').dom.value});
				
				//var k = "";
				//k += Ext.get('kw1').getValue()+" "+Ext.get('exps1').dom.value+" ";
				//k += Ext.get('kw2').getValue()+" "+Ext.get('exps2').dom.value+" ";
				//k += Ext.get('kw3').getValue()
				//Ext.MessageBox.show({msg:k});
				
				
				//Ext.MessageBox.show({msg:Ext.get('pubyear').dom.value});
			}
        }]
    });

    simple.render(document.body);
	
	bd.createChild({tag: 'h2', html: 'Complex Search'});
	
	var lexpcnt = 0;
	
	var bnts = new Ext.Toolbar({
                
				layout:'column',
				
				items:[{
					columnWidth:".1",
					xtype:"button",
					icon:'81.png',
						handler:function(){
						var _con = Ext.getCmp('cmplx');
						var row = new Ext.Panel({
												layout:"table",
            layoutConfig: {
            columns:2
            }
												});
						var _txt = new Ext.form.Field({id:"txt"+cnt,width:100});
						
						cnt = cnt+1;
						row.add(_txt);
						
						row.add(new Ext.form.ComboBox({
									   id:"fldtype"+fldcnt,
									   typeAhead:true,
									   mode:'local',
									   triggerAction:'all',
									   store:fldstore,
											   valueField:'myfid',
											   displayField:'fld'				   
									   }));
						fldcnt = fldcnt+1;
						_con.add(row);
						_con.doLayout();
						}
				},{
					columnWidth:".7"
					},{
						columnWidth:".1",
					xtype:"button",
					icon:'83.png',
						handler:function(){
							var _con =  Ext.getCmp('cmplx');
							var row = new Ext.Panel({
													layout:'form'
													});
							row.add(new Ext.form.ComboBox({
									typeAhead:true,
									 mode:'local',
									   triggerAction:'all',
									   id:"logicexp"+lexpcnt,
									   store:exstore,
											   valueField:'myeid',
											   displayField:'ex',
											   width:50
									}));
							lexpcnt = lexpcnt+1;
							_con.add(row);
							_con.doLayout();
						}
				}]
		
		
	});
	
	var abscnt = 2;
	var abslogic = 1;
	var titcnt = 2;
	var titlogic = 1;
	var jncnt = 2;
	var jnlogic = 1;
	var aucnt = 2;
	var aulogic = 1;
	
	var abssel = new Ext.form.ComboBox({
									typeAhead:true,
									 mode:'local',
									   triggerAction:'all',
									   id:"abslogic0",
									   store:exstore,
											   valueField:'myeid',
											   displayField:'ex',
											   width:50
									});
	
	var titsel = new Ext.form.ComboBox({
									typeAhead:true,
									 mode:'local',
									   triggerAction:'all',
									   id:"titlogic0",
									   store:exstore,
											   valueField:'myeid',
											   displayField:'ex',
											   width:50
									});
	
	var jnsel = new Ext.form.ComboBox({
									typeAhead:true,
									 mode:'local',
									   triggerAction:'all',
									   id:"jnlogic0",
									   store:exstore,
											   valueField:'myeid',
											   displayField:'ex',
											   width:50
									});
	
	var ausel = new Ext.form.ComboBox({
									typeAhead:true,
									 mode:'local',
									   triggerAction:'all',
									   id:"aulogic0",
									   store:exstore,
											   valueField:'myeid',
											   displayField:'ex',
											   width:50
									});
	
	var complex = new Ext.FormPanel({
        labelWidth: 75, // label settings here cascade unless overridden
        //url:'',			//save-form.php
        frame:true,
        title: 'Complex Search Form',
        bodyStyle:'padding:5px 5px 0',
        width: 550,
        defaults: {width: 230},
        defaultType: 'textfield',

        items: [{
				xtype:"fieldset",
				layout:'form',
				collapsible:true,
				width: 530,
				items:[
				bnts,{
				xtype:"panel",
				layout:'form',
				width:500,
				id:'cmplx'
				}]},{
					xtype:"fieldset",
				layout:'form',
				collapsible:true,
				width: 530,
				items:[{
					   xtype:"panel",
					   id:"cplxabs",
					   
				layout:'form',
					   items:[{
							  layout:'column',
							  items:[{
									 columnWidth:".2",
									  	xtype:"label",
							  		  	text:"Abstract"
									  },{
										  columnWidth:".1"
										  },{
										 xtype:'button',
										 icon:'add.gif',
										 handler:function(){
											 var _con = Ext.getCmp("abspanel");
											 _con.add(new Ext.form.Field({id:"abstxt"+abscnt,width:110}));
											 abscnt = abscnt+1;
											 _con.doLayout();
										  }
									   },{
										  xtype:'button',
										  icon:'add2.gif',
										  handler:function(){
											 var _con = Ext.getCmp("abspanel");
											 _con.add(new Ext.form.ComboBox({
									typeAhead:true,
									 mode:'local',
									   triggerAction:'all',
									   id:"abslogic"+abslogic,
									   store:exstore,
											   valueField:'myeid',
											   displayField:'ex',
											   width:50
									}));
										abslogic = abslogic+1;
											 _con.doLayout();
										  }
									 }]
							 
							  },{
								  xtype:"panel",
								  layout:"table",
									layoutConfig: {
									columns:6
									},
									id:"abspanel",
									items:[{
										   xtype:"textfield",
										   id:"abstxt0",
										   width:110
										   },abssel,{
											   xtype:"textfield",
										   id:"abstxt1",
										   width:110
										   }]
							  }]
					   },{
						   //======
						   
						   
					   xtype:"panel",
					   id:"cplxtit",
					   
						layout:'form',
					  		 items:[{
								  layout:'column',
								  items:[{
									 columnWidth:".2",
									  	xtype:"label",
							  		  	text:"Title"
									  },{
										  columnWidth:".1"
										  },{
										 xtype:'button',
										 icon:'add.gif',
										 handler:function(){
											 var _con = Ext.getCmp("titpanel");
											 _con.add(new Ext.form.Field({id:"tittxt"+titcnt,width:110}));
											 titcnt = titcnt+1;
											 _con.doLayout();
										  }
									   },{
										  xtype:'button',
										  icon:'add2.gif',
										  handler:function(){
											 var _con = Ext.getCmp("titpanel");
											 _con.add(new Ext.form.ComboBox({
									typeAhead:true,
									 mode:'local',
									   triggerAction:'all',
									   id:"titlogic"+titlogic,
									   store:exstore,
											   valueField:'myeid',
											   displayField:'ex',
											   width:50
									}));
										titlogic = titlogic+1;
											 _con.doLayout();
										  }
									 }]
							 
							  },{
								  xtype:"panel",
								  layout:"table",
									layoutConfig: {
									columns:6
									},
									id:"titpanel",
									items:[{
										   xtype:"textfield",
										   id:"tittxt0",
										   width:110
										   },titsel,{
											   xtype:"textfield",
										   id:"tittxt1",
										   width:110
										   }]
							  }]
						   
						   
						  // ======
					   },{
						   //=======
						   
						   xtype:"panel",
					   id:"cplxjn",
					   
						layout:'form',
					  		 items:[{
								  layout:'column',
								  items:[{
									 columnWidth:".2",
									  	xtype:"label",
							  		  	text:"Publication Title"
									  },{
										  columnWidth:".1"
										  },{
										 xtype:'button',
										 icon:'add.gif',
										 handler:function(){
											 var _con = Ext.getCmp("jnpanel");
											 _con.add(new Ext.form.Field({id:"jntxt"+jncnt,width:110}));
											 jncnt = jncnt+1;
											 _con.doLayout();
										  }
									   },{
										  xtype:'button',
										  icon:'add2.gif',
										  handler:function(){
											 var _con = Ext.getCmp("jnpanel");
											 _con.add(new Ext.form.ComboBox({
									typeAhead:true,
									 mode:'local',
									   triggerAction:'all',
									   id:"jnlogic"+jnlogic,
									   store:exstore,
											   valueField:'myeid',
											   displayField:'ex',
											   width:50
									}));
										jnlogic = jnlogic+1;
											 _con.doLayout();
										  }
									 }]
							 
							  },{
								  xtype:"panel",
								  layout:"table",
									layoutConfig: {
									columns:6
									},
									id:"jnpanel",
									items:[{
										   xtype:"textfield",
										   id:"jntxt0",
										   width:110
										   },jnsel,{
											   xtype:"textfield",
										   id:"jntxt1",
										   width:110
										   }]
							  }]
						   //=======
					   },{
							//======
					   xtype:"panel",
					   id:"cplxau",
					   
						layout:'form',
					  		 items:[{
								  layout:'column',
								  items:[{
									 columnWidth:".2",
									  	xtype:"label",
							  		  	text:"Author Name"
									  },{
										  columnWidth:".1"
										  },{
										 xtype:'button',
										 icon:'add.gif',
										 handler:function(){
											 var _con = Ext.getCmp("aupanel");
											 _con.add(new Ext.form.Field({id:"autxt"+aucnt,width:110}));
											 aucnt = aucnt+1;
											 _con.doLayout();
										  }
									   },{
										  xtype:'button',
										  icon:'add2.gif',
										  handler:function(){
											 var _con = Ext.getCmp("aupanel");
											 _con.add(new Ext.form.ComboBox({
									typeAhead:true,
									 mode:'local',
									   triggerAction:'all',
									   id:"aulogic"+aulogic,
									   store:exstore,
											   valueField:'myeid',
											   displayField:'ex',
											   width:50
									}));
										aulogic = aulogic+1;
											 _con.doLayout();
										  }
									 }]
							 
							  },{
								  xtype:"panel",
								  layout:"table",
									layoutConfig: {
									columns:6
									},
									id:"aupanel",
									items:[{
										   xtype:"textfield",
										   id:"autxt0",
										   width:110
										   },ausel,{
											   xtype:"textfield",
										   id:"autxt1",
										   width:110
										   }]
							  }]

							//======
					   }]
				}],

        buttons: [{
            text: 'Search',
			handler:function(){
				
			}
        }]
    });

    complex.render(document.body);

});