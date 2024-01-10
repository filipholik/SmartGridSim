#include "GUI.h"
#include <gtk/gtk.h>


struct dataStruct{
    GtkWidget *DSS1Button;
    GtkWidget *DSS2Button;
    GtkTextBuffer *tsDSS1Buffer;
    GtkTextBuffer *tsDSS2Buffer;
    GtkTextBuffer *asduDSS1Buffer;
    GtkTextBuffer *asduDSS2Buffer;
};

struct dataStruct* GLOABL_VAR_DATA;

char dbPath[64] = "../PHPserver/dbHandler/SGData.db";

void *myCSS(void){
    GtkCssProvider *provider;
    GdkDisplay *display;
    GdkScreen *screen;

    provider = gtk_css_provider_new ();
    display = gdk_display_get_default ();
    screen = gdk_display_get_default_screen (display);
    gtk_style_context_add_provider_for_screen (screen, GTK_STYLE_PROVIDER (provider), GTK_STYLE_PROVIDER_PRIORITY_APPLICATION);

    const gchar *styleFile = "style.css";
    GError *error = 0;

    gtk_css_provider_load_from_file(provider, g_file_new_for_path(styleFile), &error);
    g_object_unref (provider);

}

//functions to display the state (up,down or controller disconnected)
void updateButton(GtkWidget* button, int state){
    if(state == 1){
        gtk_widget_set_name(button, "up");
        gtk_button_set_label(GTK_BUTTON(button),"DSS1");;
    }
    else if(state == 2){
        gtk_widget_set_name(button, "disconnected");
        gtk_button_set_label(GTK_BUTTON(button),"Substation disconnected");
    }
    else{
        gtk_widget_set_name(button, "down");
        gtk_button_set_label(GTK_BUTTON(button),"DSS1");
    }
}

int callbackCheckConnection(void *NotUsed, int argc, char **argv, 
                    char **azColName) {
    

    NotUsed = 0;
    if(atoi(argv[0])==1){
        updateButton(GLOABL_VAR_DATA->DSS1Button,atoi(argv[1]));
    }
    if(atoi(argv[0])==2){
        updateButton(GLOABL_VAR_DATA->DSS2Button,atoi(argv[1]));//seg fault

    }
    
    return 0;
}


gboolean checkConnection(){

    sqlite3 *db;
    sqlite3_stmt *res;
    char *err_msg = 0;
    
    int rc = sqlite3_open(dbPath, &db);
    if (rc != SQLITE_OK) {
        
        fprintf(stderr, "Cannot open database: %s\n", sqlite3_errmsg(db));
        sqlite3_close(db);
        
        return 1;
    }

    char *sql = malloc(64);
    sprintf(sql,"SELECT dss,state FROM infos");

    rc = sqlite3_exec(db, sql, callbackCheckConnection, 0, &err_msg);
 
    sqlite3_close(db);

    return G_SOURCE_CONTINUE;
}

//functions to display the timestamp
void updateTsBuffer(GtkTextBuffer *buffer,char* timestamp){
    GtkTextIter iter;
    GtkTextIter start,end;
    char *bufferText  = malloc(64);
    sprintf(bufferText,"Timestamp: %s",timestamp);

    gtk_text_buffer_get_start_iter(buffer, &start);
    gtk_text_buffer_get_end_iter(buffer, &end);
    gtk_text_buffer_delete(buffer, &start, &end);
    gtk_text_buffer_get_iter_at_offset(buffer, &iter, 11);
    gtk_text_buffer_insert_with_tags_by_name(buffer, &iter, bufferText, -1, "bold",NULL);

    free(bufferText);
}

void clearBuffer(GtkTextBuffer *buffer){
    GtkTextIter iter;
    GtkTextIter start,end;

    gtk_text_buffer_get_start_iter(buffer, &start);
    gtk_text_buffer_get_end_iter(buffer, &end);
    gtk_text_buffer_delete(buffer, &start, &end);

}

int callbackTimestamp(void *NotUsed, int argc, char **argv, 
                    char **azColName) {
    
    NotUsed = 0;

        if(atoi(argv[0])==1){
            if(g_str_equal(gtk_widget_get_name(GLOABL_VAR_DATA->DSS1Button),"up")){
                updateTsBuffer(GLOABL_VAR_DATA->tsDSS1Buffer,argv[1]);
            }else{
                clearBuffer(GLOABL_VAR_DATA->tsDSS1Buffer);
            }
            
        }
        if(atoi(argv[0])==2){
            if(g_str_equal(gtk_widget_get_name(GLOABL_VAR_DATA->DSS2Button),"up")){
                updateTsBuffer(GLOABL_VAR_DATA->tsDSS2Buffer,argv[1]);
            }else{
                clearBuffer(GLOABL_VAR_DATA->tsDSS2Buffer);
            }
        }
        

    
    
    return 0;
}

gboolean updateTimestamp(){

    sqlite3 *db;
    sqlite3_stmt *res;
    char *err_msg = 0;
    
    int rc = sqlite3_open(dbPath, &db);
    if (rc != SQLITE_OK) {
        
        fprintf(stderr, "Cannot open database: %s\n", sqlite3_errmsg(db));
        sqlite3_close(db);
        
        return 0;
    }

    char *sql = malloc(64); 
    sprintf(sql,"SELECT dss,timestamp FROM infos");

    rc = sqlite3_exec(db, sql, callbackTimestamp, 0, &err_msg);
    sqlite3_close(db);
    return G_SOURCE_CONTINUE;

}

//functions to display asdu info

void updateAsduBuffer(GtkTextBuffer *asduBuffer,char* RcvdAsdu){
    
    GtkTextIter iter;
    GtkTextIter start,end;
    char *bufferText = malloc(64);
    sprintf(bufferText,"RCVD ASDU: %s",RcvdAsdu);
    
    gtk_text_buffer_get_start_iter(asduBuffer, &start);
    gtk_text_buffer_get_end_iter(asduBuffer, &end);
    gtk_text_buffer_delete(asduBuffer, &start, &end);
    gtk_text_buffer_get_iter_at_offset(asduBuffer, &iter, -1);
    gtk_text_buffer_insert_with_tags_by_name(asduBuffer, &iter, bufferText, -1, "bold",NULL);

    free(bufferText);
}

int callbackAsdu(void *NotUsed, int argc, char **argv, 
                    char **azColName) {
    
    NotUsed = 0;


    if(atoi(argv[0])==1){
        if(g_str_equal(gtk_widget_get_name(GLOABL_VAR_DATA->DSS1Button),"up")){
            updateAsduBuffer(GLOABL_VAR_DATA->asduDSS1Buffer,argv[1]);
        }else{
            clearBuffer(GLOABL_VAR_DATA->asduDSS1Buffer);
        }
        
    }
    if(atoi(argv[0])==2){
        if(g_str_equal(gtk_widget_get_name(GLOABL_VAR_DATA->DSS2Button),"up")){
            updateAsduBuffer(GLOABL_VAR_DATA->asduDSS2Buffer,argv[1]);
        }else{
            clearBuffer(GLOABL_VAR_DATA->asduDSS2Buffer);
        }
    }
    
    return 0;
}


gboolean updateAsdu(){

    sqlite3 *db;
    sqlite3_stmt *res;
    char *err_msg = 0;
    
    int rc = sqlite3_open(dbPath, &db);
    if (rc != SQLITE_OK) {
        
        fprintf(stderr, "Cannot open database: %s\n", sqlite3_errmsg(db));
        sqlite3_close(db);
        
        return 0;
    }

    char *sql = malloc(64); 
    sprintf(sql,"SELECT dss,asdu FROM infos");

    rc = sqlite3_exec(db, sql, callbackAsdu, 0, &err_msg);
    sqlite3_close(db);


    return G_SOURCE_CONTINUE;
}

int main(int argc,char** argv){
    
    
    gtk_init(&argc,&argv);

    GtkWidget *mainWindow;
    GtkWidget *DSS1Button;
    GtkWidget *DSS2Button;
    GtkWidget *mainBox;
    GtkWidget *DSS1Box;
    GtkWidget *DSS2Box;
    GtkWidget *DSS1ViewBox;
    GtkWidget *DSS2ViewBox;
    GtkWidget *tsDSS1View;
    GtkWidget *asduDSS1View;
    GtkWidget *tsDSS2View;
    GtkWidget *asduDSS2View;
    GtkTextBuffer *tsDSS1Buffer;
    GtkTextBuffer *asduDSS1Buffer;
    GtkTextBuffer *tsDSS2Buffer;
    GtkTextBuffer *asduDSS2Buffer;
    GtkTextIter iter;

    GLOABL_VAR_DATA = malloc(sizeof(*GLOABL_VAR_DATA));

    myCSS();

    /*Init all widget*/

    mainWindow = gtk_window_new(GTK_WINDOW_TOPLEVEL);
    gtk_window_set_title(GTK_WINDOW(mainWindow), "Monitoring");

    DSS1Button = gtk_button_new_with_label("DSS1");
    DSS2Button = gtk_button_new_with_label("DSS2");

    mainBox = gtk_box_new(GTK_ORIENTATION_HORIZONTAL,0);
    DSS1Box = gtk_box_new(GTK_ORIENTATION_VERTICAL,0);
    DSS2Box = gtk_box_new(GTK_ORIENTATION_VERTICAL,0);
    DSS1ViewBox = gtk_box_new(GTK_ORIENTATION_HORIZONTAL,0);
    DSS2ViewBox = gtk_box_new(GTK_ORIENTATION_HORIZONTAL,0);

    tsDSS1View = gtk_text_view_new();
    asduDSS1View = gtk_text_view_new();
    tsDSS2View = gtk_text_view_new();
    asduDSS2View = gtk_text_view_new();

    /*init the buffers*/

    tsDSS1Buffer = gtk_text_view_get_buffer (GTK_TEXT_VIEW (tsDSS1View));
    gtk_text_view_set_editable (GTK_TEXT_VIEW(tsDSS1View),FALSE);
    gtk_text_buffer_get_iter_at_offset(tsDSS1Buffer, &iter, 0);
    gtk_text_buffer_create_tag(tsDSS1Buffer,"bold", "weight", PANGO_WEIGHT_BOLD, NULL);
    gtk_text_buffer_insert_with_tags_by_name(tsDSS1Buffer, &iter, "Timestamp:\n", -1, "bold",  NULL);
    
    asduDSS1Buffer = gtk_text_view_get_buffer (GTK_TEXT_VIEW (asduDSS1View));
    gtk_text_view_set_editable (GTK_TEXT_VIEW(asduDSS1View),FALSE);
    gtk_text_buffer_get_iter_at_offset(asduDSS1Buffer, &iter, 0);
    gtk_text_buffer_create_tag(asduDSS1Buffer,"bold", "weight", PANGO_WEIGHT_BOLD, NULL);
    gtk_text_buffer_insert_with_tags_by_name(asduDSS1Buffer, &iter, "ASDU:\n", -1, "bold",  NULL);

    tsDSS2Buffer = gtk_text_view_get_buffer (GTK_TEXT_VIEW (tsDSS2View));
    gtk_text_view_set_editable (GTK_TEXT_VIEW(tsDSS2View),FALSE);
    gtk_text_buffer_get_iter_at_offset(tsDSS2Buffer, &iter, 0);
    gtk_text_buffer_create_tag(tsDSS2Buffer,"bold", "weight", PANGO_WEIGHT_BOLD, NULL);
    gtk_text_buffer_insert_with_tags_by_name(tsDSS2Buffer, &iter, "Timestamp:\n", -1, "bold",  NULL);

    asduDSS2Buffer = gtk_text_view_get_buffer (GTK_TEXT_VIEW (asduDSS2View));
    gtk_text_view_set_editable (GTK_TEXT_VIEW(asduDSS2View),FALSE);
    gtk_text_buffer_get_iter_at_offset(asduDSS2Buffer, &iter, 0);
    gtk_text_buffer_create_tag(asduDSS2Buffer,"bold", "weight", PANGO_WEIGHT_BOLD, NULL);
    gtk_text_buffer_insert_with_tags_by_name(asduDSS2Buffer, &iter, "ASDU:\n", -1, "bold",  NULL);

    /*add all widget to the mainWindow*/
    
    gtk_box_pack_start(GTK_BOX(DSS1ViewBox),tsDSS1View,TRUE,TRUE,20);
    gtk_box_pack_start(GTK_BOX(DSS1ViewBox),asduDSS1View,TRUE,TRUE,20);

    gtk_box_pack_start(GTK_BOX(DSS2ViewBox),tsDSS2View,TRUE,TRUE,20);
    gtk_box_pack_start(GTK_BOX(DSS2ViewBox),asduDSS2View,TRUE,TRUE,20);

    gtk_box_pack_start(GTK_BOX(DSS1Box),DSS1Button,FALSE,TRUE,20);
    gtk_box_pack_start(GTK_BOX(DSS1Box),DSS1ViewBox,TRUE,TRUE,20);

    gtk_box_pack_start(GTK_BOX(DSS2Box),DSS2Button,FALSE,TRUE,20);
    gtk_box_pack_start(GTK_BOX(DSS2Box),DSS2ViewBox,TRUE,TRUE,20);

    gtk_box_pack_start(GTK_BOX(mainBox),DSS1Box,TRUE,TRUE,20);
    gtk_box_pack_start(GTK_BOX(mainBox),DSS2Box,TRUE,TRUE,20);


    gtk_container_add(GTK_CONTAINER(mainWindow),mainBox);

    gtk_widget_set_size_request(mainWindow,1000,300);
    gtk_window_set_resizable(GTK_WINDOW(mainWindow),FALSE);

    gtk_widget_set_size_request(DSS1Button,450,150);
    gtk_widget_set_size_request(DSS2Button,450,150);
    

    GLOABL_VAR_DATA->DSS1Button = DSS1Button;
    GLOABL_VAR_DATA->DSS2Button = DSS2Button;
    GLOABL_VAR_DATA->tsDSS1Buffer = tsDSS1Buffer;
    GLOABL_VAR_DATA->tsDSS2Buffer = tsDSS2Buffer;
    GLOABL_VAR_DATA->asduDSS1Buffer = asduDSS1Buffer;
    GLOABL_VAR_DATA->asduDSS2Buffer = asduDSS2Buffer;
    
    g_timeout_add_seconds(1,G_SOURCE_FUNC(checkConnection),NULL);
    g_timeout_add_seconds(1,G_SOURCE_FUNC(updateTimestamp),NULL);
    g_timeout_add_seconds(1,G_SOURCE_FUNC(updateAsdu),NULL);

    g_signal_connect(mainWindow,"destroy",G_CALLBACK(gtk_main_quit),NULL);
    
    gtk_widget_show_all(mainWindow);

    

    gtk_main();

    return 0;
}