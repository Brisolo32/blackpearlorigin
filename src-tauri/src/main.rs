#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod commands;
mod paths;
mod plugins;
mod startup;

fn main() {
    // Create the usual directories if they don't exist.
    startup::init();

    // This object is the initial tauri window
    // Tauri commands that can be called from the frontend are to be invoked below
    tauri::Builder::default()
        // Invoke your commands here
        .invoke_handler(tauri::generate_handler![
            commands::plugin_installer,
            commands::file_dialog,
            commands::image_dialog,
            commands::run_game,
            commands::logging::log,
            commands::database::save_to_db,
            commands::database::get_from_db,
            commands::database::edit_in_db,
            commands::database::delete_from_db,
            commands::database::wipe_library,
            commands::metadata::get_game_metadata,
            commands::metadata::download_image,
            plugins::scan_plugins,
            plugins::uninstall_plugin,
            plugins::search
        ])
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(|_, _| {});
}
