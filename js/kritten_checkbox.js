class Kritten_Checkbox_Group
{
	constructor(passed_name, passed_kritten_checkbox_manager)
	{
		this.m_name = passed_name;
		this.m_kritten_checkbox_manager = passed_kritten_checkbox_manager;
		this.m_list_checkboxes_main = [];
		this.m_list_checkboxes = [];

		this.m_selector_checkboxes = `[data-${this.m_kritten_checkbox_manager.m_name_data_checkbox}="${this.m_name}"]`;
		this.m_selector_checkboxes_main = `[data-${this.m_kritten_checkbox_manager.m_name_data_checkbox_main}="${this.m_name}"]`;

		this.init();
	}

	init()
	{
		$(document).on('change', this.m_selector_checkboxes, this,  this.on_change);
		$(document).on('change', this.m_selector_checkboxes_main, this,  this.on_change_main);
	}

	on_change(event)
	{
		if($(`${event.data.m_selector_checkboxes}:checked`).length == event.data.m_list_checkboxes.length)
		{
			event.data.check_checkboxes($(event.data.m_selector_checkboxes_main));
		} else {
			event.data.uncheck_checkboxes($(event.data.m_selector_checkboxes_main));
		}
	}

	on_change_main(event)
	{
		if($(this).prop('checked'))
		{
			event.data.check_checkboxes($(event.data.m_selector_checkboxes));
			event.data.check_checkboxes($(event.data.m_selector_checkboxes_main));
		} else {
			event.data.uncheck_checkboxes($(event.data.m_selector_checkboxes));
			event.data.uncheck_checkboxes($(event.data.m_selector_checkboxes_main));
		}
	}

	check_checkboxes(list_checkboxes)
	{
		list_checkboxes.prop('checked', true);
	}

	uncheck_checkboxes(list_checkboxes)
	{
		list_checkboxes.prop('checked', false);
	}

	add_checkbox(checkbox)
	{
		this.m_list_checkboxes.push(checkbox);
	}

	add_checkbox_main(checkbox)
	{
		this.m_list_checkboxes_main.push(checkbox);
	}
}

class Kritten_Checkbox_Manager
{
	constructor()
	{
		this.m_name_data_checkbox = 'kritten_checkbox';
		this.m_name_data_checkbox_main = 'kritten_checkbox_main';
        this.m_name_checkbox_default = 'checkbox-default';
		this.m_map_checkbox = new Map();
        this.init();
	}

	init()
	{
		const that = this;

		$(`[data-${this.m_name_data_checkbox}]`).each(function(i, element) {
			const checkbox = $(element);

			let name = checkbox.data(that.m_name_data_checkbox);
		
			if(name == '' || name == undefined)
			{
				name = that.m_name_checkbox_default;
				checkbox.data(that.m_name_data_checkbox, name);
				checkbox.attr(`data-${that.m_name_data_checkbox}`, name);
			}

			const checkbox_group = that.get_or_create_checkbox_group(name);

			checkbox_group.add_checkbox(checkbox);
		});

		$(`[data-${this.m_name_data_checkbox_main}]`).each(function(i, element) {
			const checkbox = $(element);

			let name = checkbox.data(that.m_name_data_checkbox_main);
		
			if(name == '' || name == undefined)
			{
				name = that.m_name_checkbox_default;
				checkbox.data(that.m_name_data_checkbox_main, name);
				checkbox.attr(`data-${that.m_name_data_checkbox_main}`, name);
			}

			const checkbox_group = that.get_or_create_checkbox_group(name);

			checkbox_group.add_checkbox_main(checkbox);
		});
	}

	get_or_create_checkbox_group(name)
	{
		let checkbox_group = this.m_map_checkbox.get(name);

		if(checkbox_group == undefined)
		{
			checkbox_group = new Kritten_Checkbox_Group(name, this);
			this.m_map_checkbox.set(name, checkbox_group);
		}

		return checkbox_group;
	}
}

let kritten_checkbox_manager = undefined
try {
	kritten_checkbox_manager = new Kritten_Checkbox_Manager(kritten_checkbox_settings);
} catch(ex) {
	kritten_checkbox_manager = new Kritten_Checkbox_Manager();
}