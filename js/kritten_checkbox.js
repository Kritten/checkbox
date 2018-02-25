function for_each(selector, func)
{
    const elements = document.querySelectorAll(selector);
    for (let i = elements.length - 1; i >= 0; i--) {
        func(elements[i], i);
    }
}

function add_event(type, parent, selector_target, callback, data = undefined)
{
    if(typeof parent === 'string')
    {
        throw 'Not supported';
    }

    parent.addEventListener(type, function(event) {
        if(event.target.matches(selector_target))
        {
            callback = callback.bind(event.target);
            callback(event, data);
        }
    });
}

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
        add_event('change', document, this.m_selector_checkboxes, this.on_change, this);
        add_event('change', document, this.m_selector_checkboxes_main, this.on_change_main, this);
    }

    on_change(event, data)
    {
        if(document.querySelectorAll(`${data.m_selector_checkboxes}:checked:not([disabled])`).length == data.m_list_checkboxes.length)
        {
            data.check_checkboxes(`${data.m_selector_checkboxes_main}:not([disabled])`);
        } else {
            data.uncheck_checkboxes(`${data.m_selector_checkboxes_main}:not([disabled])`);
        }
    }

    on_change_main(event, data)
    {
        if(this.checked)
        {
            data.check_checkboxes(`${data.m_selector_checkboxes}:not([disabled])`);
            data.check_checkboxes(`${data.m_selector_checkboxes_main}:not([disabled])`);
        } else {
            data.uncheck_checkboxes(`${data.m_selector_checkboxes}:not([disabled])`);
            data.uncheck_checkboxes(`${data.m_selector_checkboxes_main}:not([disabled])`);
        }
    }

    check_checkboxes(selector_list_checkboxes)
    {
        for_each(selector_list_checkboxes, function(element) {
            element.checked = true;
        });
    }

    uncheck_checkboxes(selector_list_checkboxes)
    {
        for_each(selector_list_checkboxes, function(element) {
            element.checked = false;
        });
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

        for_each(`[data-${this.m_name_data_checkbox}]:not([disabled])`, function(element, i) {
            const checkbox = element;
            const name_data_checkbox = that.m_name_data_checkbox;
            let name = checkbox.dataset[name_data_checkbox];

            const checkbox_group = that.get_or_create_checkbox_group(name);

            checkbox_group.add_checkbox(checkbox);
        });

        for_each(`[data-${this.m_name_data_checkbox_main}]:not([disabled])`, function(element, i) {
            const checkbox = element;

            const name_data_checkbox_main = that.m_name_data_checkbox_main;
            let name = checkbox.dataset[name_data_checkbox_main];

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
