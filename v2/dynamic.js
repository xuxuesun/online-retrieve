Ext.onReady(function(){
   
    Ext.QuickTips.init();

    Ext.form.Field.prototype.msgTarget = 'side';

    var bd = Ext.getBody();

    var cnt=1;

    var g_mask;
    /*
     *==================== Default form =====================
     */
    bd.createChild({tag:'h2',html:'Default Search'});
    
    var defau = new Ext.FormPanel({
	    id:'default',
	    labelWidth: 75,
		frame:true,
		title: 'Default Search Form',
		bodyStyle:'padding:5px 5px 0',
		width: 350,
		defaults: {width: 230},
		defaultType: 'textfield',
		items: [{
		  fieldLabel: 'Search Text',
		  id: 'intxt',
		  name:'intxt'
		}],
        buttons: [{
            text: 'Search',
			handler:function(){
			var txt = '\''+Ext.get('intxt').dom.value+'\'';
			
			var pars = 'intxt:'+txt+",";
			pars = pars+'flag:'+'\''+'1'+'\'';
			
			pars = '({'+pars+'})';
			pars = eval(pars);
			
			g_mask = new Ext.LoadMask(Ext.getBody(),{msg:"Search in progress..."});
			g_mask.show();
			Ext.Ajax.timeout = 12000000;
			Ext.Ajax.request({
				url:'query.php',
				method:'POST',
				success: function(response){
				g_mask.hide();
				Ext.Msg.alert("success!",response.responseText);
						
				},
				failure:function(){
				g_mask.hide();
				Ext.Msg.alert("search failed,please check your networks and try again");
				},
				params:pars
			});
			}
	    }]
	});
    
    defau.render(document.body);

    /*
     *==================== Expand form =====================
     */
    bd.createChild({tag:'h2',html:'Expand Search'});
    
    var expand = new Ext.FormPanel({
	      id:'expand',
		frame:true,
		title: 'Expand Search Form',
		bodyStyle:'padding:5px 5px 0',
		width: 550,
		items: [{
		    layout:'column',
		    items:[{
		      columnWidth:'.13',
		      xtype:'label',
		      text:'Search Text'
		      },{
		      columnWidth:'.29',
			xtype:'textfield',
			fieldLabel: '',
			id:'intxt1',
			name:'intxt1'
		    },{
		      columnWidth:'.29',
			xtype:'textfield',
			fieldLabel: '',
			id:'intxt2',
			name:'intxt2'
		    },{
		      columnWidth:'.29',
			xtype:'textfield',
			fieldLabel: '',
			id:'intxt3',
			name:'intxt3'
		    }]
		}],
        buttons: [{
            text: 'Search',
			handler:function(){
			var txt1 = '\''+Ext.get('intxt1').dom.value+'\'';
			var txt2 = '\''+Ext.get('intxt2').dom.value+'\'';
			var txt3 = '\''+Ext.get('intxt3').dom.value+'\'';
			
			var pars = 'intxt1:'+txt1+",";
			pars = pars+'intxt2:'+txt2+",";
			pars = pars+'intxt3:'+txt3+",";
			pars = pars+'flag:'+'\''+'2'+'\'';
			
			pars = '({'+pars+'})';
			pars = eval(pars);
			
			g_mask = new Ext.LoadMask(Ext.getBody(),{msg:"Search in progress..."});
			g_mask.show();
			Ext.Ajax.timeout = 12000000;
			Ext.Ajax.request({
				url:'query.php',
				method:'POST',
				success: function(response){
				g_mask.hide();
				Ext.Msg.alert("success!",response.responseText);
						
				},
				failure:function(){
				g_mask.hide();
				Ext.Msg.alert("search failed,please check your networks and try again");
				},
				params:pars
			});
			}
	    }]
	});
    
    expand.render(document.body);

    /*
     * ================  Advanced form  =======================
     */
    bd.createChild({tag: 'h2', html: 'Advanced Search'});
	
	var s_abscnt = 2;
	var s_abslogic = 1;
	var abscnt = 2;
	var abslogic = 1;
	var s_titcnt = 2;
	var s_titlogic = 1;
	var titcnt = 2;
	var titlogic = 1;
	var s_jncnt = 2;
	var s_jnlogic = 1;
	var jncnt = 2;
	var jnlogic = 1;
	var s_aucnt = 2;
	var s_aulogic = 1;
	var aucnt = 2;
	var aulogic = 1;
	var s_pycnt = 1;
	var pycnt = 1;
	var s_doicnt = 1;
	var doicnt = 1;
	
	var exstore = new Ext.data.ArrayStore({
		id:0,
		fields:['myeid','ex'],
		data:[['AND','AND'],['OR','OR']]
	});


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
		var rec = new YearRecord({myyid:1950+j,ye:1950+j});
		ystore.add(rec);
	}
	
	var years = new Ext.form.ComboBox({
		typeAhead:true,
		mode:'local',
		triggerAction:'all',
		id:"pycnt0",
		name:"pubyear",
		store:ystore,
		valueField:'myyid',
		displayField:'ye',
		width:60
	});
	
	var advanced = new Ext.FormPanel({
        labelWidth: 75, // label settings here cascade unless overridden
        frame:true,
        title: 'Advanced Search Form',
        bodyStyle:'padding:5px 5px 0',
        width: 550,
        defaults: {width: 230},
        defaultType: 'textfield',

        items: [{
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
					icon:'81.png',
					handler:function(){
						var _con = Ext.getCmp("abspanel");
						if(s_abslogic < abslogic)
						{
						  Ext.getCmp("abslogic"+s_abslogic).setValue("");
						  Ext.getCmp("abslogic"+s_abslogic).show();
						  s_abslogic += 1;
						}else{
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
						 s_abslogic += 1;
						}
						 
						if(s_abscnt < abscnt)
						{
						  Ext.getCmp("abstxt"+s_abscnt).setValue("");
						  Ext.getCmp("abstxt"+s_abscnt).show();
						  s_abscnt += 1;
						}else{
						_con.add(new Ext.form.Field({id:"abstxt"+abscnt,width:110}));
						abscnt = abscnt+1;
						s_abscnt += 1;
						}
						_con.doLayout();
					}
				    },{
					columnWidth:".1"
					},{
					    	xtype:'button',
						icon:'85.png',
						handler:function(){
						  if(s_abslogic > 1){
						  	var _con = Ext.getCmp("abspanel");
					 	  	s_abscnt = s_abscnt-1;
							Ext.getCmp("abstxt"+s_abscnt).hide();

						  	s_abslogic = s_abslogic-1;
							Ext.getCmp("abslogic"+s_abslogic).hide();
							_con.doLayout();
						  }
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
							    icon:'81.png',
							    handler:function(){
								    var _con = Ext.getCmp("titpanel");
								    if(s_titlogic < titlogic)
								    {
								      Ext.getCmp("titlogic"+s_titlogic).setValue("");
								      Ext.getCmp("titlogic"+s_titlogic).show();
								      s_titlogic += 1;
								    }else{
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
								      s_titlogic += 1;
								    }

								    if(s_titcnt < titcnt)
								    {
								      Ext.getCmp("tittxt"+s_titcnt).setValue("");
								      Ext.getCmp("tittxt"+s_titcnt).show();
								      s_titcnt += 1;
								    }else{
								    _con.add(new Ext.form.Field({id:"tittxt"+titcnt,width:110}));
								    titcnt = titcnt+1;
								    s_titcnt += 1;
								    }
								      _con.doLayout();
							      }
							      },{
							      columnWidth:".1"
							      },{
								      xtype:'button',
								      icon:'85.png',
								      handler:function(){
									if(s_titlogic > 1){
									      var _con = Ext.getCmp("titpanel");
									      s_titcnt = s_titcnt-1;
									      Ext.getCmp("tittxt"+s_titcnt).hide();
									      
									      s_titlogic = s_titlogic-1;
									      Ext.getCmp("titlogic"+s_titlogic).hide();
									      _con.doLayout();
									}
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
								  text:"Publication Name"
							    },{
								    columnWidth:".1"
								    },{
								    xtype:'button',
								    icon:'81.png',
								    handler:function(){
									    var _con = Ext.getCmp("jnpanel");
									    if(s_jnlogic < jnlogic)
									    {
									      Ext.getCmp("jnlogic"+s_jnlogic).setValue("");
									      Ext.getCmp("jnlogic"+s_jnlogic).show();
									      s_jnlogic += 1;
									    }else{
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
									    s_jnlogic += 1;
									    }

									    if(s_jncnt < jncnt)
									    {
									      Ext.getCmp("jntxt"+s_jncnt).setValue("");
									      Ext.getCmp("jntxt"+s_jncnt).show();
									      s_jncnt += 1;
									    }else{
									    _con.add(new Ext.form.Field({id:"jntxt"+jncnt,width:110}));
									    jncnt = jncnt+1;
									    s_jncnt += 1;
									    }
									    _con.doLayout();
								    }
							      },{
							      columnWidth:".1"
							      },{
								      xtype:'button',
								      icon:'85.png',
								      handler:function(){
									if(s_jnlogic > 1){
									      var _con = Ext.getCmp("jnpanel");
									      s_jncnt = s_jncnt-1;
									      Ext.getCmp("jntxt"+s_jncnt).hide();
									      
									      s_jnlogic = s_jnlogic-1;
									      Ext.getCmp("jnlogic"+s_jnlogic).hide();
									      _con.doLayout();
									}
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
								    icon:'81.png',
								    handler:function(){
									    var _con = Ext.getCmp("aupanel");
									    if(s_aulogic < aulogic)
									    {
									      Ext.getCmp("aulogic"+s_aulogic).setValue("");
									      Ext.getCmp("aulogic"+s_aulogic).show();
									      s_aulogic += 1;
									    }else{
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
									    s_aulogic += 1;
									    }

									    if(s_aucnt < aucnt)
									    {
									      Ext.getCmp("autxt"+s_aucnt).setValue("");
									      Ext.getCmp("autxt"+s_aucnt).show();
									      s_aucnt += 1;
									    }else{
									    _con.add(new Ext.form.Field({id:"autxt"+aucnt,width:110}));
									    aucnt = aucnt+1;
									    s_aucnt += 1;
									    }
									    _con.doLayout();
								    }
							      },{
							      columnWidth:".1"
							      },{
								      xtype:'button',
								      icon:'85.png',
								      handler:function(){
									if(s_aulogic > 1){
									      var _con = Ext.getCmp("aupanel");
									      s_aucnt = s_aucnt-1;
									      Ext.getCmp("autxt"+s_aucnt).hide();
									      
									      s_aulogic = s_aulogic-1;
									      Ext.getCmp("aulogic"+s_aulogic).hide();
									      _con.doLayout();
									}
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
			      },{
					  //======
			      xtype:"panel",
			      id:"cplxpy",
			      
				  layout:'form',
					    items:[{
						    layout:'column',
						    items:[{
							    columnWidth:".2",
								  xtype:"label",
								  text:"Publication Year"
							    },{
								    columnWidth:".1"
								    },{
								    xtype:'button',
								    icon:'81.png',
								    handler:function(){
									    var _con = Ext.getCmp("pypanel");
									    if(s_pycnt < pycnt){
									      var lbcnt = s_pycnt -1;
									      Ext.getCmp("pycnt"+s_pycnt).setValue("");
									      Ext.getCmp("pycnt"+s_pycnt).show();
									      Ext.getCmp("pylabel"+lbcnt).show();
									      s_pycnt += 1;
									    }else{
									    var lbcnt = pycnt-1;
									    _con.add(new Ext.form.Label({
									      text:"OR",
									      width:50,
									      id:"pylabel"+lbcnt
									    }));
									  
									    _con.add(new Ext.form.ComboBox({
										typeAhead:true,
										mode:'local',
										triggerAction:'all',
										id:"pycnt"+pycnt,
										name:"pubyear",
										store:ystore,
										valueField:'myyid',
										displayField:'ye',
										width:60
									      }));
									    pycnt = pycnt+1;
									    s_pycnt += 1;
									    }
									    _con.doLayout();
								    }
							      },{
								    columnWidth:".1"
								    },{
								    xtype:'button',
								    icon:'85.png',
								    handler:function(){
									    var _con = Ext.getCmp("pypanel");
									    
									    if(s_pycnt > 1){
									      s_pycnt = s_pycnt-1;
									      Ext.getCmp("pycnt"+s_pycnt).hide();
									      var lbcnt = s_pycnt-1;
									      Ext.getCmp("pylabel"+lbcnt).hide();
									      _con.doLayout();
									   }
								    }
							      }]
					    
						  },{
						    xtype:"panel",
						    layout:"table",
							  layoutConfig: {
							  columns:6
							  },
							  id:"pypanel",
							  items:[years]
					    }]

					  //======
			      },{
					  //======
			      xtype:"panel",
			      id:"cplxdoi",
			      
				  layout:'form',
					    items:[{
						    layout:'column',
						    items:[{
							    columnWidth:".2",
								  xtype:"label",
								  text:"DOI Number"
							    },{
								    columnWidth:".1"
								    },{
								    xtype:'button',
								    icon:'81.png',
								    handler:function(){
									    var _con = Ext.getCmp("doipanel");
									    if(s_doicnt < doicnt){
									      var lbcnt = s_doicnt -1;
									      Ext.getCmp("doi"+s_doicnt).setValue("");
									      Ext.getCmp("doi"+s_doicnt).show();
									      Ext.getCmp("doilabel"+lbcnt).show();
									      s_doicnt += 1;
									    }else{
									    var lbcnt = doicnt-1;
									    _con.add(new Ext.form.Label({
									      text:"OR",
									      width:50,
									      id:"doilabel"+lbcnt
									    }));

									_con.add(new Ext.form.Field({id:"doi"+doicnt,width:110}));   
									doicnt = doicnt+1;
									s_doicnt += 1;
									}
									_con.doLayout();
								      
								    }
							      },{
								    columnWidth:".1"
								    },{
								    xtype:'button',
								    icon:'85.png',
								    handler:function(){
									    var _con = Ext.getCmp("doipanel");
									    
									    if(s_doicnt > 1){
									      s_doicnt = s_doicnt-1;
									      Ext.getCmp("doi"+s_doicnt).hide();
									      var lbcnt = s_doicnt-1;
									      Ext.getCmp("doilabel"+lbcnt).hide();
									      _con.doLayout();
									   }
								    }
							      }]
					    
						  },{
						    xtype:"panel",
						    layout:"table",
							  layoutConfig: {
							  columns:6
							  },
							  id:"doipanel",
							  items:[{
								      xtype:"textfield",
								      id:"doi0",
								      width:110
								      }]
					    }]

					  //======
			      }]
		  }],

        buttons: [{
            text: 'Search',
			handler:function(){
				var t = 0;
				//author
				var autlist = '\'';
				autlist = autlist +Ext.getCmp('autxt0').getValue()+" "+Ext.getCmp('aulogic0').getValue()
					+" "+Ext.getCmp('autxt1').getValue();
				for(i=1;i <s_aulogic; i++)
				{
				  t = i+1;
				  autlist = autlist+" "+Ext.getCmp('aulogic'+i).getValue()+" "+Ext.getCmp('autxt'+t).getValue();
				}
				autlist = autlist + '\'';
				
				//title
				var titlist = '\'';
				titlist = titlist + Ext.getCmp('tittxt0').getValue()+" "+Ext.getCmp('titlogic0').getValue()
					+" "+Ext.getCmp('tittxt1').getValue();
				for(i=1;i <s_titlogic; i++)
				{
				  t = i+1;
				  titlist = titlist+" "+Ext.getCmp('titlogic'+i).getValue()+" "+Ext.getCmp('tittxt'+t).getValue();
				}
				titlist = titlist + '\'';

				//publication name
				var jnlist = '\'';
				jnlist = jnlist + Ext.getCmp('jntxt0').getValue()+" "+Ext.getCmp('jnlogic0').getValue()
					 +" "+Ext.getCmp('jntxt1').getValue();
				for(i=1;i <s_jnlogic; i++)
				{
				  t = i+1;
				  jnlist = jnlist+" "+Ext.getCmp('jnlogic'+i).getValue()+" "+Ext.getCmp('jntxt'+t).getValue();
				}
				jnlist = jnlist + '\'';

				//abstraction
				var abslist = '\'';
				abslist = abslist + Ext.getCmp('abstxt0').getValue()+" "+Ext.getCmp('abslogic0').getValue()
					  +" "+Ext.getCmp('abstxt1').getValue();
				for(i=1;i <s_abslogic; i++)
				{
				  t = i+1;
				  abslist = abslist+" "+Ext.getCmp('abslogic'+i).getValue()+" "+Ext.getCmp('abstxt'+t).getValue();
				}
				abslist = abslist + '\'';

				//publication year
				var pylist = '\''+Ext.getCmp('pycnt0').getValue();
				for(i=1;i <s_pycnt; i++)
				  pylist = pylist+" OR "+Ext.getCmp('pycnt'+i).getValue();
				pylist = pylist + '\'';
				
				//doi number
				var doilist = '\''+Ext.getCmp('doi0').getValue();
				for(i=1;i <s_doicnt; i++)
					doilist = doilist+" OR "+Ext.getCmp('doi'+i).getValue();
				doilist = doilist + '\'';
				
			var pars = 'title:'+titlist+",";
			pars = pars + 'authors:'+autlist+",";
			pars = pars + 'pubname:'+jnlist+",";
			pars = pars + 'doinum:'+doilist+",";
			pars = pars + 'abstract:'+abslist+",";
			pars = pars + 'pubyear:'+pylist+",";
			pars = pars+'flag:'+'\''+'3'+'\'';
			
			pars = '({'+pars+'})';
			pars = eval(pars);
			
			g_mask = new Ext.LoadMask(Ext.getBody(),{msg:"Search in progress..."});
			g_mask.show();
			Ext.Ajax.timeout = 12000000;
			Ext.Ajax.request({
				url:'query.php',
				method:'POST',
				success: function(response){
				g_mask.hide();
				Ext.Msg.alert("success!",response.responseText);
						
				},
				failure:function(){
				g_mask.hide();
				Ext.Msg.alert("search failed,please check your networks and try again");
				},
				params:pars
			});
			}
        }]
    });

    advanced.render(document.body);
});