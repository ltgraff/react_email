// npm start

import React, {useState, useEffect} from 'react';
import DOMPurify from 'dompurify';
import timer from './timer.js';
import R_COMMANDS from './r_commands';
import R_LIST_DISPLAY from './r_list_display';
import './App.css';


var m_tab = null;
var m_parsed_sql = null;
//var m_email_amount = 50;
var m_first_item = null;
var m_last_item = null;
var m_id_list = [ ];
var m_command = "cur";

function App() {
	const [contacts, set_contacts] = useState(['hiya! this is the initial state']);
	const [loading, set_loading] = useState(true);
	useEffect(() => {
		display_update();
		// Disable useEffect dependency warning
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	var m_display_string = "";

	const m_timer = new timer();

	function err(err_str) {
		throw new Error("Error: "+err_str);
	}

	function click_select_email(em_body) {
		if (m_tab === null) {
			m_tab = window.open('', '_blank');
			if (m_tab === null) {
				console.log('New tab could not be opened, possibly disable popup blocker');
				return;
			}
			m_tab.addEventListener('beforeunload', () => {  
				m_tab = null;
			});
			m_tab.document.title = 'Message';
			//m_tab.document.body.style.backgroundColor = 'yellow';
		}
		m_tab.document.body.innerHTML = em_body;
	}

	// Called during refresh of page and inital loading
	function display_update() {
		// var		scoped to function body
		// let		scoped to block

		let dtmp = new timer();
		let ftmp = new timer();

		ftmp.start();

		fetch('http://localhost:3001').then(response => {
			ftmp.stop();
			dtmp.start();

			let tmp = response.text();

			console.log("response from fetch: "+tmp);
			//return response.text();
			return tmp;
		})
		.then((data) => {
			set_loading(false);
			m_parsed_sql = JSON.parse(data);
			update_email_list();

			dtmp.stop();

			console.log("in display_update()");
			console.log("fetch timer: \t\t"+ftmp.get_elapsed_milli());
			console.log(".then data timer: \t"+dtmp.get_elapsed_milli());
		})
		.catch(error => {
			err("An error occurred in display_update: "+error);
		});
	}

	/*
	* Add an email item to the proper position of the list, by date descending
	*/
	function email_add_item(flist, item) {
		let idate = new Date(item.received);
		item.pdate = idate;

		if (flist.length < 1) {
			flist.push(item);
			return;
		}
		for (let i=0;i<flist.length;i++) {
			if (item.pdate > flist[i].pdate) {
				flist.unshift(item);
				return;
			}
		}
		flist.push(item);
	}

	function update_next() {
		let i;
		let flist = [ ];

<<<<<<< HEAD
		for (i=0;i<m_parsed_sql.length;i++) 
=======
		for (i=0;i<m_parsed_sql.length;i++)
>>>>>>> 9e0a24bd1da6a25a3856a0a5ee5feb551c3fc98d
			email_add_item(flist, m_parsed_sql[i]);
		m_first_item = flist[0].received;
		if (flist.length-1 > -1)
			m_last_item = flist[flist.length-1].received;
		else
			m_last_item = m_first_item;
		set_contacts(flist);
	}

	function update_default() {
		m_first_item = m_parsed_sql[0].received;
		if (m_parsed_sql.length-1 > -1)
			m_last_item = m_parsed_sql[m_parsed_sql.length-1].received;
		else
			m_last_item = m_first_item;
		set_contacts(m_parsed_sql);
	}

	function update_email_list() {
		m_id_list = [ ];

<<<<<<< HEAD
		if (m_parsed_sql === null)
=======
		if (m_parsed_sql === null) {
>>>>>>> 9e0a24bd1da6a25a3856a0a5ee5feb551c3fc98d
			err("m_parsed_sql is null");
		if (m_command === "next")
			update_next();
		else
			update_default();
	}

	function click_update_email_list(value) {
		if (value === "cur") {
			m_first_item = null;
			m_last_item = null;
			m_id_list = [ ];
		}
		m_timer.start();
		handle_post_request(value);
	}
	
	function HtmlRenderer({ htmlContent }) {
		const sanitizedHtml = DOMPurify.sanitize(htmlContent);
		return (
			<div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
		);
	}

	function handle_post_request(cmd) {
		let tmp1 = new timer();
		let tmp2 = new timer();

		tmp1.start();

		m_command = cmd;
		const postData = {
			key1: m_command,
			key2: m_first_item,
			key3: m_last_item,
			key4: m_id_list,
		};

		fetch('http://localhost:3001/api/send-data', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json', // Specify the content type
			},
			body: JSON.stringify(postData), // Convert data to JSON format
		})
		.then((response) => {
			tmp1.stop();
			tmp2.start();
			if (! response.ok)
				err("Network response was not ok: "+response.text());
			update_email_list();
			return response.text();
		})
		.then((data) => {
			tmp2.stop();
			m_parsed_sql = JSON.parse(data);
			update_email_list();

			m_timer.stop();

			console.log("fetch to .then: \t"+tmp1.get_elapsed_milli());
			console.log(".then to data: \t\t"+tmp2.get_elapsed_milli());
			console.log("Total timer from: \t"+m_timer.get_elapsed_milli());
			console.log(" ");
			console.log(" ");
		})
		.catch((error) => {
			err("POST request error: "+error);
		});
	}
	
	return (
		<main>
			{loading === true ? (
				<div>
					<h1>Loading..</h1>
				</div>
			) : (

		<div className="R_COMMANDS">
			<R_COMMANDS onChildClick={click_update_email_list}/>
				<div style={{
					width:		'1520px',
					height:		'550px',
					overflowY:	'scroll',
					padding:	'0px 0px'
				}}>
					<div className="R_List_Display">
						<R_LIST_DISPLAY click_select_email={click_select_email} items={contacts} title="" />
					</div>
				</div>
				<br/>
				<br/>
				<HtmlRenderer htmlContent={m_display_string} />
			</div>
				)
			}
		</main>
	);
}

export default App;
