NODE_BIN := node_modules/.bin
FLOW := $(NODE_BIN)/flow
BABEL := $(NODE_BIN)/babel
BUILD_DIR := lib
SOURCE_DIR := src
SOURCE_FILES := $(wildcard $(SOURCE_DIR)/*) 
BUILT_FILES := $(patsubst src/%,lib/%, $(SOURCE_FILES))

.PHONY: default build compile typecheck run clean

default: compile 

compile: $(BUILT_FILES)

# Check each file and deps for type errors first.
# Compile with sourcemaps.
lib/%: src/%
	@ flow_output=$$($(FLOW) check --quiet --color=always $<); \
	if [[ $$flow_output != "Found 0 errors" ]]; then \
		echo "$$flow_output"; \
	fi; \
	echo $@ "=>" $< ; \
	mkdir -p $(dir $@) ; \
	$(BABEL) $< --out-file $@ --source-maps ;

# Typecheck everything at once.
typecheck:
	@ $(FLOW) check --strip-root

# Rebuild node_modules if needed.
node_modules: package.json yarn.lock
	@ yarn install

run: compile
	@ node $(BUILD_DIR)

clean:
	@ rm -rf $(BUILD_DIR)

