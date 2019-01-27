FROM docker.elastic.co/elasticsearch/elasticsearch:6.7.0

RUN /usr/share/elasticsearch/bin/elasticsearch-plugin install analysis-icu

COPY --chown=elasticsearch:elasticsearch elasticsearch.yml /usr/share/elasticsearch/config/
