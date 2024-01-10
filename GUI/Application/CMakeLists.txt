include_directories(
   .
)

set(example_SRCS
   GUI.c
)

IF(WIN32)
set_source_files_properties(${example_SRCS}
                                       PROPERTIES LANGUAGE CXX)
ENDIF(WIN32)

add_executable(GUI
  ${example_SRCS}
)

target_link_libraries(simple_client
    lib60870
)
