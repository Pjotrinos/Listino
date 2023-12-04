import { atom } from 'jotai'
export const ListsAtom = atom([])
export const isDarkAtom = atom(false)
export const langueSelectAtom = atom("cz")
export const leangueBookAtom = atom(
    {
        "cz":{
            "text_archive": "Zobrazit archivované",
            "text_create_list": "Vytvořit seznam",
            "text_nav_home": "domu",
            "text_archiveList": "Archivovat",
            "text_archiveState": "Archivované",
            "text_unArchiveList": "Obnovit z archivu",
            "text_login": "Přihlásit se",

            "text_setting_list": "Nastavení listu",
            "text_setting_listName": "Název listu",
            "text_setting_listDescription": "Popisek",
            "text_setting_listLink": "Link k obrázku",
            "text_setting_acceptButton": "Uložit změny",
            "text_setting_closeButton": "Zavřít",
            "text_showTasks": "Zobrazit odškrtnuté",
            "text_addTask": "Nový úkol",
            "text_deleteTask": "Smazání úkolu",
            "text_otherPeople": "dalších"
        },
        "en":{
            "text_archive": "Show archived",
            "text_create_list": "Create list",
            "text_nav_home": "home",
            "text_archiveList": "Archive",
            "text_archiveState": "Archived",
            "text_unArchiveList": "Rebirth list form archive",
            "text_login": "Log In",

            "text_setting_list": "Settings",
            "text_setting_listName": "List name",
            "text_setting_listDescription": "Description",
            "text_setting_listLink": "Image link",
            "text_setting_acceptButton": "Save Changes",
            "text_setting_closeButton": "Close",
            "text_showTasks": "Show checked",
            "text_addTask": "New Task",
            "text_deleteTask": "Delete Task",
            "text_otherPeople": "other"
        }
    }
)